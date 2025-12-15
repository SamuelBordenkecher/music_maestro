from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.views import UserPermissions
from rest_framework import status as s
from django.shortcuts import get_object_or_404
from .serializers import InquirySerializer, MessageSerializer, MessageThreadSerializer, Inquiry, MessageThread, Message
from teachers_app.models import TeacherProfile
from students_app.models import StudentProfile

# Create your views here.

class SendInquiry(UserPermissions):

    def post(self, request):
        if not request.user.is_student:
            return Response(
                {'detail': 'Only students may send inquiries.'},
                status=s.HTTP_403_FORBIDDEN
            )
        else:
            teacher_id = request.data.get('teacher_id')
            teacher = get_object_or_404(TeacherProfile, id=teacher_id)

            inquiry = Inquiry.objects.create(
                student=request.user.student_profile,
                teacher=teacher,
                subject=request.data.get('subject', ''),
                message=request.data.get('message', '')
            )

            ser_inquiry = InquirySerializer(inquiry)
            return Response(ser_inquiry.data, status=s.HTTP_201_CREATED)
        

class MyInquiries(UserPermissions):
    def get(self, request):
        if not request.user.is_teacher:
            return Response(
                {'detail': 'Only teachers may view inquiries.'},
                status=s.HTTP_403_FORBIDDEN
            )
        
        teacher = request.user.teacher_profile
        inquiries = teacher.inquiries.all().order_by('-created_at')
        ser_inquiries = InquirySerializer(inquiries, many=True)
        return Response(ser_inquiries.data, status=s.HTTP_200_OK)


class InquiryDetail(UserPermissions):
    def get(self, request, inquiry_id):
        inquiry = get_object_or_404(
            Inquiry, id=inquiry_id, teacher=request.user.teacher_profile
        )
        ser_inquiry = InquirySerializer(inquiry)
        return Response(ser_inquiry.data, status=s.HTTP_200_OK)



    def delete(self, request, inquiry_id):
        inquiry = get_object_or_404(
            Inquiry, id=inquiry_id, teacher=request.user.teacher_profile
        )
        inquiry.delete()
        return Response(status=s.HTTP_204_NO_CONTENT)









class test_view(APIView):
    def get(self, request):
        return Response(f"{request} was successful")
    

