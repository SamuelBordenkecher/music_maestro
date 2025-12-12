from rest_framework import serializers
from .models import StudentProfile
from instruments_app.models import Instrument
from instruments_app.serializers import InstrumentSerializer

class StudentProfileSerializer(serializers.ModelSerializer):
    instruments = InstrumentSerializer(many=True, read_only=True)
    instrument_ids = serializers.PrimaryKeyRelatedField(
        queryset=Instrument.objects.all(),
        many=True,
        write_only=True,
        source='instruments'
    )
    
    class Meta:
        model = StudentProfile
        fields = '__all__'
