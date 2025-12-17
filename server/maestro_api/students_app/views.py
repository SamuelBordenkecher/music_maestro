from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StudentProfileSerializer, StudentProfile
from user_app.views import UserPermissions
from rest_framework import status as s
from maestro_api.utilities import miles_between

# Create your views here.

class test_view(APIView):
    def get(self, request):
        return Response(f"{request} was successful")
    

class MyStudentProfile(UserPermissions):

    def get(self, request):
        student_profile = request.user.student_profile
        return Response(StudentProfileSerializer(student_profile).data)
    
    def put(self, request):
        student_profile = request.user.student_profile
        update_student_profile = StudentProfileSerializer(student_profile, data=request.data, partial=True)
        if update_student_profile.is_valid():
            student_profile = update_student_profile.save()
            return Response(StudentProfileSerializer(student_profile).data, status=s.HTTP_202_ACCEPTED)
        else:
            return Response(update_student_profile.errors, status=s.HTTP_400_BAD_REQUEST)


class Astudent(APIView):

    def get(self, request, id):
        student = get_object_or_404(StudentProfile, id=id)
        ser_student = StudentProfileSerializer(student).data

        user = request.user if request.user.is_authenticated else None
        distance = None

        if user:
            distance = miles_between(
                user.latitude,
                user.longitude,
                student.user.latitude,
                student.user.longitude
            )

        ser_student['distance_miles'] = distance

        return Response(ser_student, status=s.HTTP_200_OK)
    
