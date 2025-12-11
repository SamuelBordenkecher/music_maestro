from django.db import models
from lessons_app.models import Lesson
from django.core.validators import MinValueValidator, MaxValueValidator


class Payment(models.Model):
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(1.00), MaxValueValidator(500.00)])
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=30,
    choices=[('pending', 'Pending'), ('paid', 'Paid'), ('failed', 'Failed')],
    default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lesson.student.user.username} paid {self.lesson.teacher.user.username} ${self.amount}"