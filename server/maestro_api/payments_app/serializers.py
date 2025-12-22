from rest_framework import serializers
from .models import Payment
from students_app.serializers import StudentProfileSerializer

class PaymentSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['created_at', 'lesson', 'stripe_payment_intent_id']