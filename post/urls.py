from rest_framework import routers
from django.urls import path, include
from post.views import PostViewSet, ListPostViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
