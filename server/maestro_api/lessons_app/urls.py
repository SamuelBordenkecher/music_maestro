from django.urls import path
from .views import LessonList, LessonDetails

urlpatterns = [
    path('', LessonList.as_view(), name='create-lesson'),           
    path('<int:teacher_id>/', LessonList.as_view(), name='teacher-lessons'),
    path('<int:id>/detail/', LessonDetails.as_view(), name="lesson-detail"),
]