from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeacherProfileSerializer
from .models import TeacherProfile
from user_app.views import UserPermissions
from rest_framework import status as s
from maestro_api.utilities import miles_between

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
        user = request.user if request.user.is_authenticated else None
        teachers = TeacherProfile.objects.all()
        results = []
        for teacher in teachers:
            ser_teacher = TeacherProfileSerializer(teacher).data
            distance = None
            if user:
                distance = miles_between(
                    user.latitude,
                    user.longitude,
                    teacher.user.latitude,
                    teacher.user.longitude
                )
            ser_teacher['distance_miles'] = distance
            results.append(ser_teacher)
        
        if user:
            results.sort(key=lambda x: (x["distance_miles"] is None, x["distance_miles"]))

        return Response(results, status=s.HTTP_200_OK)


        
class ATeacher(APIView):

    def get(self, request, id):
        teacher = get_object_or_404(TeacherProfile, id=id)
        ser_teacher = TeacherProfileSerializer(teacher).data

        user = request.user if request.user.is_authenticated else None
        distance = None

        if user:
            distance = miles_between(
                user.latitude,
                user.longitude,
                teacher.user.latitude,
                teacher.user.longitude
            )
        ser_teacher['distance_miles'] = distance

        return Response(ser_teacher, status=s.HTTP_200_OK)

    
    