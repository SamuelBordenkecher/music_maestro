from django.db import models
from maestro_api import settings
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile
# Create your models here.

class Inquiry(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='inquiries')
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='inquiries')
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    responded = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} inquiry to {self.teacher.user.username}"


class MessageThread(models.Model):
    inquiry = models.OneToOneField(Inquiry, on_delete=models.CASCADE, related_name='thread', null=True, blank=True)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='message_threads')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        usernames = ", ".join([user.username for user in self.participants.all()])
        return f"Thread between {usernames}"

class Message(models.Model):
    thread = models.ForeignKey(MessageThread, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.created_at}"

