from rest_framework import routers
from django.urls import path, include
from follow.views import FollowViewSet

router = routers.DefaultRouter()
router.register(r'follow', FollowViewSet, basename='follow')

follow_urls = [
] + router.urls
