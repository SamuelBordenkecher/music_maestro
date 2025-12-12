from django.urls import path
from .views import test_connection, SignUp, LogIn, LogOut, Info


urlpatterns = [
    path('test/', test_connection),
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', LogIn.as_view(), name='login'),
    path('logout/', LogOut.as_view(), name='logout'),
    path('info/', Info.as_view(), name='info'),
]