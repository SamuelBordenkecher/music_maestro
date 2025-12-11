"""
URL configuration for maestro_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework import status as s

# def test_connection(request):
#     return Response("connected", status=s.HTTP_200_OK)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('user_app.urls')),
    path('api/instruments/', include('instruments_app.urls')),
    path('api/teachers/', include('teachers_app.urls')),
    path('api/students/', include('students_app.urls')),
    path('api/payments/', include('payments_app.urls')),
    path('api/reviews/', include('reviews_app.urls')),
    path('api/lessons/', include('lessons_app.urls')),
    path('api/inquiries/', include('inquiries_app.urls')),

]
