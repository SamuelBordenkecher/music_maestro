from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token
from .models import User

class UserSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_token(self, user):
        return user.auth_token.key
    
    def create(self, validated_data):
        email = validated_data.get('email')
        validated_data['username'] = email
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user