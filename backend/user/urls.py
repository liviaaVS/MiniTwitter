from rest_framework import routers
from django.urls import path, include
from user.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='Users')

users_urls = [] + router.urls
