from rest_framework import serializers
from post.models import Post


class ListPostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()  # Campos adicionais calculados

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date_created', 'author', 'likes']
        read_only_fields = ['id', 'date_created']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['id', 'date_created']