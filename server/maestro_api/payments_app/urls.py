from django.urls import path
from .views import CreatePaymentIntent, TeacherPayments
from .webhooks import stripe_webhook

urlpatterns = [
    path('create-intent/', CreatePaymentIntent.as_view(), name='create_payment_intent'),
    path('stripe-webhook/', stripe_webhook, name='stripe_webhook'),
    path('teacher/', TeacherPayments.as_view(), name="teacher-payments"),
]