from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as s
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile

# Create your views here.

class SignUp(APIView):
    def post(self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            user = new_user.save()
            if user.is_teacher:
                TeacherProfile.objects.get_or_create(user=user)
            if user.is_student:
                StudentProfile.objects.get_or_create(user=user)
            return Response(UserSerializer(user).data, status=s.HTTP_201_CREATED)
        else:
            return Response(new_user.errors, status=s.HTTP_400_BAD_REQUEST)
        
class LogIn(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get("password")
        user = authenticate(
            username=email, password=password
        )
        if user:
            token, created = Token.objects.get_or_create(user=user)
            # login(request, user)
            return Response(UserSerializer(user).data, status=s.HTTP_200_OK)
        else:
            return Response({'Detail': 'No user matching credentials'}, status=s.HTTP_404_NOT_FOUND)
        
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes= [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)
    
class LogOut(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(f"{request.user.username} has been logged out.", status=s.HTTP_204_NO_CONTENT)
    
class Delete(UserPermissions):
    def delete(self, request):
        email = request.user.email
        request.user.delete()
        return Response({'message': f"Account for {email} has been deleted."}, status=s.HTTP_202_ACCEPTED)
















from django.http import JsonResponse

def test_connection(request):
    return JsonResponse({'Connected': True})