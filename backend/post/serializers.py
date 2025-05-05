from rest_framework import serializers
from post.models import Post


class ListPostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    user_image = serializers.ImageField(source='author.picture', read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'user_image', 'image',  'date_created', 'count_likes']


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)
    class Meta:
        model = Post
        fields = [ 'title', 'content',  'author', 'image']
        read_only_fields = ['id', 'date_created', 'count_likes']
