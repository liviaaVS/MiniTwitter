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
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # <- Isto desativa a proteção por autenticação
