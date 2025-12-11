from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token
from .models import User

class UserSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '_all__'

    def get_token(self, user):
        return user.auth_token.key
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user