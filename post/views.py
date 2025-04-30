from django.shortcuts import render

from post.models import Post
from post.serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# Create your views here.
class PostViewSet:
    # Your viewset code here
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]