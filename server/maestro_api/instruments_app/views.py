from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Instrument, InstrumentSerializer

# Create your views here.

class AllInstruments(APIView):
    def get(self, request):
        instruments = Instrument.objects.all()
        return Response(InstrumentSerializer(instruments, many=True).data)