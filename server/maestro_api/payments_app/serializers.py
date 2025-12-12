from rest_framework import serializers
from .models import Payment
from lessons_app.serializers import LessonSerializer, Lesson

class PaymentSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)
    lesson_id = serializers.PrimaryKeyRelatedField(
        queryset=Lesson.objects.all(), write_only=True, source='lesson'
    )

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['created_at', 'lesson', 'stripe_payment_intent_id']