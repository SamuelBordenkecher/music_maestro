from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as s
import stripe
from .models import Payment
from .serializers import PaymentSerializer
from lessons_app.models import Lesson
from maestro_api import settings
from user_app.views import UserPermissions
from decimal import Decimal
from django.shortcuts import get_object_or_404

# Create your views here.

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntent(UserPermissions):
    def post(self, request):

        lesson_id = request.data.get('lesson_id')
        lesson = get_object_or_404(Lesson, id=lesson_id)

        if not lesson.student:
            if not hasattr(request.user, 'student_profile'):
                return Response({'detail': 'Only students can pay for lessons'}, status=s.HTTP_403_FORBIDDEN)
            lesson.student = request.user.student_profile
            lesson.save()
        elif lesson.student.user != request.user:
            return Response(status=s.HTTP_403_FORBIDDEN)
        
        amount = Decimal(lesson.price)
        amount_cents = int(amount * 100)
        
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency='usd',
                metadata={'lesson_id': lesson.id}
            )

            payment = Payment.objects.create(
                lesson=lesson,
                amount=amount,
                stripe_payment_intent_id=intent.id,
                status='pending'
            )

            return Response({
                'client_secret': intent.client_secret,
                'payment_id': payment.id
            }, status=s.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error': str(e)}, status=s.HTTP_400_BAD_REQUEST)
        

            
