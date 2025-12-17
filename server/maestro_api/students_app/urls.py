from django.urls import path
from .views import Astudent, MyStudentProfile

urlpatterns = [
    path('<int:id>/', Astudent.as_view(), name='a_student'),
    path('myprofile/', MyStudentProfile.as_view(), name='my_student_profile')
]