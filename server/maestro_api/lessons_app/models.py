from django.db import models
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile


class Lesson(models.Model):
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='lessons')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='lessons')
    date_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    location_type = models.CharField(
    max_length=50,
    choices=[('teacher', "Teacher's location"), ('student', "Student's location"), ('remote', 'Remote')],
    default='teacher'
    )
    status = models.CharField(max_length=30,
    choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('completed', 'Completed'), ('cancelled', 'Cancelled')],
    default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.teacher.user.username} with {self.student.user.username}"