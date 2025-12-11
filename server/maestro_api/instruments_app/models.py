from django.db import models

# Create your models here.
class Instrument(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.name}"