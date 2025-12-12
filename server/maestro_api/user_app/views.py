from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as s
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
# Create your views here.

class SignUp(APIView):
    def post(self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            new_user.save()
            return Response(new_user.data, status=s.HTTP_201_CREATED)
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
            return Response(UserSerializer(user).data)
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
        return Response(f"{request.user.username} has been logged out.")
















from django.http import JsonResponse

def test_connection(request):
    return JsonResponse({'Connected': True})