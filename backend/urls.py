from rest_framework.routers import DefaultRouter
from django.urls import path
from backend.views import PostViewSet

router = DefaultRouter()
router.register(r'post', PostViewSet, basename="Post")
app_name = "cacatalks"

cacatalks_urls = [

] + router.urls