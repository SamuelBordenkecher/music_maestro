from rest_framework import serializers
from inquiries_app.models import Inquiry, Message, MessageThread
from teachers_app.models import TeacherProfile
from teachers_app.serializers import TeacherProfileSerializer
from students_app.models import StudentProfile
from students_app.serializers import StudentProfileSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class InquirySerializer(serializers.ModelSerializer):

    teacher = TeacherProfileSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=TeacherProfile.objects.all(), write_only=True, source='teacher'
    )
    student = StudentProfileSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentProfile.objects.all(), write_only=True, source='student'
    )

    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ['created_at']



class MessageThreadSerializer(serializers.ModelSerializer):

    teacher = TeacherProfileSerializer(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    inquiry_id = serializers.PrimaryKeyRelatedField(
        queryset=Inquiry.objects.all(), write_only=True, source='inquiry'
    )

    class Meta:
        model = MessageThread
        fields = '__all__'
        read_only_fields = ['created_at']




class MessageSerializer(serializers.ModelSerializer):

    sender_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='sender'
    )

    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['created_at', 'sender']