from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    follower = serializers.IntegerField(source='follower_count', read_only=True)
    following = serializers.IntegerField(source='following_count', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'follower', 'following',
            'picture', 'is_active', 'is_staff', 'is_superuser'
        ]
        read_only_fields = ['id']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'picture']
        read_only_fields = ['id']
   
