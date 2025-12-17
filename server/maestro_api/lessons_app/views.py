from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Lesson
from .serializers import LessonSerializer
from user_app.views import UserPermissions
from rest_framework import status as s

# Create your views here.

class LessonList(UserPermissions):

    def get(self, request):
        user = request.user

        if user.is_teacher:
            lessons = Lesson.objects.filter(teacher=user.teacher_profile)
        elif user.is_student:
            lessons = Lesson.objects.filter(student=user.student_profile)
        else:
            return Response(
                {"detail": "User is unassigned"}, status=s.HTTP_400_BAD_REQUEST   
            )
        
        ser_lesson = LessonSerializer(lessons, many=True)
        return Response(ser_lesson.data, status=s.HTTP_200_OK)

    def post(self, request):
        user = request.user

        if not user.teacher_profile:
            return Response(
                {"detail": "Only teacher's can create lessons"}, 
                status=s.HTTP_403_FORBIDDEN
            )
        data = request.data.copy()
        data['teacher_id'] = user.teacher_profile.id
        data['status'] = 'pending'

        ser_lesson = LessonSerializer(data=data)
        if ser_lesson.is_valid():
            ser_lesson.save()
            return Response(ser_lesson.data, status=s.HTTP_201_CREATED)
        return Response(ser_lesson.errors, status=s.HTTP_400_BAD_REQUEST)
    
class LessonDetails(UserPermissions):

    # Refactor with a get_object to reduce reused code

    def get(self, request, id):
        user = request.user
        lesson = get_object_or_404(Lesson, id=id)
        teacher_profile = getattr(user, "teacher_profile", None)
        student_profile = getattr(user, "student_profile", None)

        if student_profile and lesson.student != student_profile:
            return Response({"detail": "Not allowed"}, status=403)
        if teacher_profile and lesson.teacher != teacher_profile:
            return Response({"detail": "Not allowed"}, status=403)
        ser_lesson = LessonSerializer(lesson)
        return Response(ser_lesson.data, status=s.HTTP_200_OK)
    
    def patch(self, request, id):
        user = request.user
        lesson = get_object_or_404(Lesson, id=id)
        teacher_profile = getattr(user, "teacher_profile", None)
        student_profile = getattr(user, "student_profile", None)

        if student_profile and lesson.student != student_profile:
            return Response({"detail": "Not allowed"}, status=403)
        if teacher_profile and lesson.teacher != teacher_profile:
            return Response({"detail": "Not allowed"}, status=403)
                
        ser_lesson = LessonSerializer(lesson, data=request.data, partial=True)
        if ser_lesson.is_valid():
            ser_lesson.save()
            return Response(ser_lesson.data, status=s.HTTP_200_OK)
        return Response(ser_lesson.errors, status=s.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        user = request.user
        lesson = get_object_or_404(Lesson, id=id)
        teacher_profile = getattr(user, "teacher_profile", None)
        student_profile = getattr(user, "student_profile", None)

        if student_profile and lesson.student != student_profile:
            return Response({"detail": "Not allowed"}, status=403)
        if teacher_profile and lesson.teacher != teacher_profile:
            return Response({"detail": "Not allowed"}, status=403)
        return Response(status=s.HTTP_204_NO_CONTENT)
        