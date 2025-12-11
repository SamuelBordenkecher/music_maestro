from django.urls import path
from .views import test_connection, SignUp


urlpatterns = [
    path('test/', test_connection),
    path('signup', SignUp.as_view()),
]