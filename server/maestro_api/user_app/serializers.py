from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id", 'token', "email", "username", "password", "first_name", "last_name",
            "date_of_birth", "zip_code", "city", "state", "latitude",
            "longitude", "profile_image", "created_at", "updated_at", "is_teacher", "is_student"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }
        read_only_fields = ["id", "username", "token", "created_at", "updated_at"]


    def validate(self, data):
        if data.get('is_teacher') and data.get('is_student'):
            raise serializers.ValidationError("User cannot be both teacher and student.")
        if not data.get('is_teacher') and not data.get('is_student'):
            raise serializers.ValidationError("User must be either teacher or student.")
        return data


    def get_token(self, user):
        return user.auth_token.key
    
    def create(self, validated_data):
        email = validated_data.get('email')
        validated_data['username'] = email
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        if user.is_teacher:
            TeacherProfile.objects.create(user=user)
        if user.is_student:
            StudentProfile.objects.create(user=user)

        Token.objects.create(user=user)
        return user