from rest_framework import routers
from django.urls import path, include
from post.views import PostViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

app_name = "Posts"

posts_urls = [
] + router.urls 
