from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from follow.models import Follow
from follow.serializers import FollowSerializer

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = []  # Defina permissões conforme necessário

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Follow.objects.filter(follower=user)
        return Follow.objects.none()

    @action(detail=True, methods=['get'], url_path='following')
    def user_following(self, request, pk=None):
        """
        Lista os usuários que o usuário com id `pk` está seguindo.
        """
        try:
            following = Follow.objects.filter(follower__id=pk).values_list('followed__id', flat=True)
            return Response({'following': list(following),
                             'count': len(following)})
        except Exception:
            return Response({'detail': 'Erro ao buscar seguindo.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='followers')
    def user_followers(self, request, pk=None):
        """
        Lista os seguidores do usuário com id `pk`.
        """
        try:
            followers = Follow.objects.filter(followed__id=pk).values_list('follower__id', flat=True)
            return Response({'followers': list(followers),
                             'count': len(followers)})
        except Exception:
            return Response({'detail': 'Erro ao buscar seguidores.'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['get'], url_path='is_following_or_followed')
    def is_following_or_followed(self, request, pk=None):
        """
        Verifica se o usuário autenticado é seguido ou está seguindo o usuário com id `pk`.
        """
        user = request.user

        is_following = Follow.objects.filter(follower=user, followed__id=pk).exists()
        is_followed = Follow.objects.filter(follower__id=pk, followed=user).exists()
        return Response({'is_following': is_following,
                             'is_followed': is_followed})
