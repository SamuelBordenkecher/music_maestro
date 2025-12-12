from django.urls import path
from .views import AllInstruments

urlpatterns = [
    path('', AllInstruments.as_view(), name='all-instruments'),
]