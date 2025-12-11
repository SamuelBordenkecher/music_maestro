from django.contrib import admin
from .models import Inquiry, MessageThread, Message

admin.site.register([Inquiry, MessageThread, Message])
