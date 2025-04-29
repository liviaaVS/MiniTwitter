from django.shortcuts import render
from rest_framework import viewsets
from backend.models import Post, Like, Follow
from backend.serializers import PostSerializer, LikeSerializer, FollowSerializer, ListPostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication, SessionAuthentication # for authentication
from rest_framework.decorators import action # for action decorator
from rest_framework.response import Response # for Response class
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Post instances.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated] # only authenticated users can access this viewset
    authentication_classes = [TokenAuthentication, SessionAuthentication] # use token and session authentication

    def post(self, request, *args, **kwargs):
        """
        Create a new post.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)
    def getAllPosts(self, request, *args, **kwargs):
        """
        Get all posts.
        """
        queryset = self.get_queryset()
        serializer = ListPostSerializer(queryset, many=True)
        return Response(serializer.data, status=200)
    