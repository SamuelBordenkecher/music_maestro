from django.urls import path
from .views import test_view, SendInquiry

urlpatterns = [
    path('test/', test_view.as_view(), name='test_view'),
    path('', SendInquiry.as_view, name="send_inquiry")
]