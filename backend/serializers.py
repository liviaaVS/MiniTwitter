from rest_framework import serializers
from backend.models import Follow, Post, Like

class ListPostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()  # Campos adicionais calculados

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date_created', 'author', 'likes']
        read_only_fields = ['id', 'date_created']

    def get_likes(self, obj):
        # Conta os likes para o post
        return obj.likes.count()  # Contagem de objetos Like relacionados ao Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['id', 'date_created']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ['id', 'date_liked']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
        read_only_fields = ['id', 'date_request']

