from rest_framework.serializers import ModelSerializer
from .models import Instrument

class InstrumentSerializer(ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'
