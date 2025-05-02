from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'picture', 'is_active', 'is_staff', 'is_superuser']
        read_only_fields = ['id']
        
    def create(self, validated_data):
        """
        Create a new user instance.
        """
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'picture']
        read_only_fields = ['id']
   
