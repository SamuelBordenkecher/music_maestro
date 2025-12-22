from rest_framework import serializers
from .models import TeacherProfile
from instruments_app.models import Instrument
from instruments_app.serializers import InstrumentSerializer
from user_app.serializers import UserSerializer

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    instruments = InstrumentSerializer(many=True, read_only=True)

    instrument_ids = serializers.PrimaryKeyRelatedField(
        queryset=Instrument.objects.all(),
        many=True,
        write_only=True,
        source='instruments'
    )

    class Meta:
        model = TeacherProfile
        fields = '__all__'

    def update(self, instance, validated_data):
        instruments = validated_data.pop('instruments', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        if instruments is not None:
            instance.instruments.set(instruments)
        return instance



