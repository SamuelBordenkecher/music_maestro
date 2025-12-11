from rest_framework.serializers import ModelSerializer
from inquiries_app.models import Inquiry

class InquirySerializer(ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'