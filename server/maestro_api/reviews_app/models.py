from django.db import models
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Review(models.Model):
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='reviews')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='reviews')
    reviewer_is_teacher = models.BooleanField(default=False)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Future features
    teacher_reply = models.TextField(blank=True, null=True)
    is_reported = models.BooleanField(default=False)

    def __str__(self):
        if self.reviewer_is_teacher:
            reviewer = self.teacher.user.username
            reviewee = self.student.user.username
        else:
            reviewer = self.student.user.username
            reviewee = self.teacher.user.username

        return f"{reviewer} left a review for {reviewee}: {self.rating} stars"