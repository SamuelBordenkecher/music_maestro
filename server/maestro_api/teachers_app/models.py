from django.db import models
from maestro_api import settings
from instruments_app.models import Instrument
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class TeacherProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_profile')
    bio = models.TextField(blank=True)
    instruments = models.ManyToManyField(Instrument, related_name='teacher_profile')
    default_rate = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(500)])
    certificate = models.FileField(upload_to='teacher_certificate', blank=True, null=True)
    is_active_for_booking = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.user}"
