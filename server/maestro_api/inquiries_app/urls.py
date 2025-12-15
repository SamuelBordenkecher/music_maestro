from django.urls import path
from .views import test_view, SendInquiry, MyInquiries, InquiryDetail

urlpatterns = [
    path('test/', test_view.as_view(), name='test_view'),
    path('', SendInquiry.as_view(), name="send_inquiry"),
    path('mine/', MyInquiries.as_view(), name='my_inquiries'),
    path('<int:inquiry_id>/', InquiryDetail.as_view(), name='inquiry_detail'),

]