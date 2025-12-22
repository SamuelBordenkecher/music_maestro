from rest_framework import serializers
from .models import Lesson
from teachers_app.models import TeacherProfile
from teachers_app.serializers import TeacherProfileSerializer
from students_app.models import StudentProfile
from students_app.serializers import StudentProfileSerializer
from payments_app.serializers import PaymentSerializer

class LessonSerializer(serializers.ModelSerializer):

    payment = PaymentSerializer(read_only=True)

    teacher = TeacherProfileSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=TeacherProfile.objects.all(), write_only=True, source='teacher'
    )
    student = StudentProfileSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentProfile.objects.all(), write_only=True, source='student', required=False, allow_null=True
    )

    class Meta:
        model = Lesson
        fields = '__all__'

