from rest_framework import serializers
from follow.models import Follow
from follow.services import FollowService

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
        read_only_fields = ['id', 'date_created', 'follower']
       
    def create(self, validated_data):
        if validated_data['follower'] == validated_data['followed']:
            raise serializers.ValidationError("You cannot follow yourself.")
        if Follow.objects.filter(follower=validated_data['follower'], following=validated_data['followed']).exists():
            raise serializers.ValidationError("You are already following this user.")
        return super().create(validated_data)

   