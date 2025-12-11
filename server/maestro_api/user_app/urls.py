from django.urls import path
from .views import test_connection, SignUp, LogIn, LogOut


urlpatterns = [
    path('test/', test_connection),
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', LogIn.as_view(), name='login'),
]