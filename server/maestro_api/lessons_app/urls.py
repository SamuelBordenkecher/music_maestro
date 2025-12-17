from django.urls import path
from .views import LessonList, LessonDetails

urlpatterns = [
    path('', LessonList.as_view(), name='lessons'),
    path('<int:id>/', LessonDetails.as_view(), name="lesson-detail"),
]