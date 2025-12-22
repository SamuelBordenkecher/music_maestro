import stripe
from maestro_api import settings
from .models import Payment
from lessons_app.models import Lesson
from django.http import HttpResponse
from rest_framework import status as s
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    try:
        if event['type'] == 'payment_intent.succeeded':
            intent = event['data']['object']
            lesson_id = intent.metadata.get('lesson_id')

            if not lesson_id:
                print("Webhook: Missing lesson_id in metadata")
                return HttpResponse(status=400)

            try:
                lesson = Lesson.objects.get(id=lesson_id)
            except Lesson.DoesNotExist:
                print(f"Webhook: Lesson {lesson_id} does not exist")
                return HttpResponse(status=400)

            payment = getattr(lesson, "payment", None)
            if payment:
                payment.status = 'paid'
                payment.save()

                lesson.status = "confirmed"
                lesson.save
            else:
                print(f"Webhook: Payment for lesson {lesson_id} does not exist")

        else:
            print(f"Webhook: Ignoring {event['type']}")

    except Exception as e:
        print("Webhook error:", e)
        return HttpResponse(status=500)

    return HttpResponse(status=200)
