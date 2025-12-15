from django.urls import path
from .views import test_view, MyTeacherProfile, AllTeachers, ATeacher

urlpatterns = [
    path('myprofile/', MyTeacherProfile.as_view(), name='my_teacher_profile'),
    path("", AllTeachers.as_view(), name='all_teachers'),
    path('<int:id>/', ATeacher.as_view(), name='a_teacher'),

]