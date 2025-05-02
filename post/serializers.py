from rest_framework import serializers
from post.models import Post


class ListPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['id', 'date_created']


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)
    class Meta:
        model = Post
        fields = [ 'title', 'content',  'author', 'image']
        read_only_fields = ['id', 'date_created', 'count_likes']
