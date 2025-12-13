from django.urls import path
from .views import test_view, MyStudentProfile

urlpatterns = [
    path('test/', test_view.as_view(), name='test_view'),
    path('myprofile/', MyStudentProfile.as_view(), name='my_student_profile')
]