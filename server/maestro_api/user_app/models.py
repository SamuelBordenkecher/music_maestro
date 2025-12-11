from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date
from django.utils import timezone
from .validators import validate_zip, validate_dob


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True, blank=True, validators=[validate_dob])
    zip_code = models.CharField(max_length=10, validators=[validate_zip])
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def age(self):
        if self.date_of_birth:
            today = date.today()
            return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
        return None
    