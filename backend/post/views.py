from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import viewsets
from rest_framework.permissions import  AllowAny
from post.models import Post
from post.serializers import ListPostSerializer, PostSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

from post.services import PostService

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # Permite acesso a todos os usuários
    parser_classes = [MultiPartParser, FormParser]


    def get_serializer(self, *args, **kwargs):
        if(self.action in ['list', 'retrieve']):
            self.serializer_class = ListPostSerializer
        if(self.action == 'liked_post'):
            return None

        return super().get_serializer(*args, **kwargs)
    
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('title', openapi.IN_FORM, type=openapi.TYPE_STRING),
            openapi.Parameter('content', openapi.IN_FORM, type=openapi.TYPE_STRING),
            openapi.Parameter('author', openapi.IN_FORM, type=openapi.TYPE_INTEGER),
            openapi.Parameter('image', openapi.IN_FORM, type=openapi.TYPE_FILE, required=True),
        ]
    )

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    # Action customizada para "curtir" um post
    @action(detail=True, methods=['post'], )
    def liked_post(self, request, pk=None):
        post_service = PostService(Post.objects.get(pk=pk))
        likes = post_service.liked_post()
        return Response({'status': 'like added',
                         'count_likes': likes}, status=status.HTTP_200_OK)

    