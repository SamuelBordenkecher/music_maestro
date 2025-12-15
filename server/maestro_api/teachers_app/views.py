from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeacherProfileSerializer
from .models import TeacherProfile
from user_app.views import UserPermissions
from rest_framework import status as s

# Create your views here.

class test_view(APIView):
    def get(self, request):
        return Response(f"{request} was successful")

class MyTeacherProfile(UserPermissions):

    def get(self, request):
        teacher_profile = request.user.teacher_profile
        return Response(TeacherProfileSerializer(teacher_profile).data)
    
    def put(self, request):
        teacher_profile = request.user.teacher_profile
        update_teacher_profile = TeacherProfileSerializer(teacher_profile, data=request.data, partial=True)
        if update_teacher_profile.is_valid():
            teacher_profile = update_teacher_profile.save()
            return Response(TeacherProfileSerializer(teacher_profile).data, status=s.HTTP_202_ACCEPTED)
        else:
            return Response(update_teacher_profile.errors, status=s.HTTP_400_BAD_REQUEST)
        
class AllTeachers(APIView):
    def get(self, request):
        teacher = TeacherProfile.objects.all()
        ser_teacher = TeacherProfileSerializer(teacher, many=True)
        return Response(ser_teacher.data, status=s.HTTP_200_OK)


        
class ATeacher(APIView):

    def get(self, request, id):
        teacher = get_object_or_404(TeacherProfile, id=id)
        ser_teacher = TeacherProfileSerializer(teacher)
        return Response(ser_teacher.data, status=s.HTTP_200_OK)

    
    