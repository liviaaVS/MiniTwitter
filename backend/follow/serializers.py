from rest_framework import serializers
from user.models import User
from follow.models import Follow

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
        read_only_fields = ['id', 'date_created', 'follower']

    def create(self, validated_data):
        follower = validated_data.get('follower')
        followed = validated_data.get('followed')

        if follower == followed:
            raise serializers.ValidationError("You cannot follow yourself.")
        
        if Follow.objects.filter(follower=follower, followed=followed).exists():
            raise serializers.ValidationError("You are already following this user.")
        
        return super().create(validated_data)


class ListUserFollowSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = ['id', 'username', 'picture']
        read_only_fields = ['id', 'date_created']