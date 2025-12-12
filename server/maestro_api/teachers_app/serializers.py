from rest_framework import serializers
from .models import TeacherProfile
from instruments_app.models import Instrument
from instruments_app.serializers import InstrumentSerializer

class TeacherProfileSerializer(serializers.ModelSerializer):

    instruments = InstrumentSerializer(many=True, read_only=True)

    instrument_id = serializers.PrimaryKeyRelatedField(
        queryset=Instrument.objects.all(),
        many=True,
        write_only=True,
        source='instruments'
    )

    class Meta:
        model = TeacherProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
