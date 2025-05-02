from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import viewsets
from rest_framework.permissions import  AllowAny
from post.models import Post
from post.serializers import PostSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # Permite acesso a todos os usuários
    parser_classes = [MultiPartParser, FormParser]


    
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
    @swagger_auto_schema(auto_schema=None)
    @action(detail=True, methods=['patch'])
    def liked_post(self, request, pk=None):
        post = self.get_object()  # Usa o pk da URL
        post.increment_likes()
        post.save()
        return Response({'status': 'like added'}, status=status.HTTP_200_OK)
  