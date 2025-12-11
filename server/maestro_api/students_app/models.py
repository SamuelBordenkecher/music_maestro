from django.db import models
from maestro_api import settings
from instruments_app.models import Instrument

# Create your models here.
class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    instruments = models.ManyToManyField(Instrument, related_name='students', blank=True)
    is_child = models.BooleanField(default=False)
    bio = models.TextField(blank=True)
    PROFICIENCY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    proficiency_level = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES, blank=True, null=True)
    learning_goals = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user}"