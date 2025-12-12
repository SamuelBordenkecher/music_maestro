from rest_framework import serializers
from .models import Review
from teachers_app.serializers import TeacherProfileSerializer, TeacherProfile
from students_app.serializers import StudentProfileSerializer, StudentProfile

class ReviewSerializer(serializers.ModelSerializer):
    teacher = TeacherProfileSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=TeacherProfile.objects.all(), write_only=True, source='teacher'
    )
    student = StudentProfileSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentProfile.objects.all(), write_only=True, source='student'
    )

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at', 'teacher', 'student']