from django.shortcuts import render
from rest_framework import viewsets

from follow.models import Follow
from follow.serializers import FollowSerializer
# Create your views here.

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = []  # Define your permission classes here

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)  # Automatically set the follower to the logged-in user
    