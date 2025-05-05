from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.db.models import Q
from follow.services import FollowService
from user.models import User
from follow.models import Follow
from follow.serializers import FollowSerializer, ListUserFollowSerializer
from random import sample


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
        request_user = request.user
        fs = FollowService()
    
        following = fs.get_following(request_user.id)
        serializer = ListUserFollowSerializer(following, many=True)
        return Response({'following': serializer.data, 'count': len(following)}, status=status.HTTP_200_OK)

   
    @action(detail=True, methods=['get'], url_path='followers')
    def user_followers(self, request, pk=None):
        """
        Lista os seguidores do usuário com id `pk`.
        """
        request_user = request.user
        fs = FollowService()
        followers = fs.get_followers(request_user.id)
        serializer = ListUserFollowSerializer(followers, many=True)
        return Response({'followers': serializer.data, 'count': len(followers)}, status=status.HTTP_200_OK)

        
    @action(detail=False, methods=['get'], url_path='suggestions')
    def user_suggestions(self, request):
        """
        Retorna até 5 sugestões de usuários que o usuário autenticado ainda não segue.
        """
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'Usuário não autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

        # IDs de usuários já seguidos
        following_ids = Follow.objects.filter(follower=user).values_list('followed__id', flat=True)
        
        # Exclui o próprio usuário e quem ele já segue
        users_to_suggest = User.objects.exclude(
            Q(id__in=following_ids) | Q(id=user.id)
        )

        # Pega uma amostra aleatória de até 5 usuários
        users_list = list(users_to_suggest)
        suggested_users = sample(users_list, min(len(users_list), 5))

        serializer = ListUserFollowSerializer(suggested_users, many=True)
        return Response({'suggestions': serializer.data})
    

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

    def create(self, request):
        """
        Seguir um usuário.
        """
        user = request.user

        try:
            followed_user = User.objects.get(id=request.data.get('followed'))
            
            follow, created = Follow.objects.get_or_create(
                follower=user,
                followed=followed_user
            )

            if not created:
                return Response({'detail': 'You already follow this user'}, status=status.HTTP_200_OK)

            return Response({'detail': 'User followed successfully'}, status=status.HTTP_201_CREATED)

        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)




    @action(detail=True, methods=['delete'], url_path='unfollow')
    def unfollow(self, request, pk=None):
        """
        Deixar de seguir um usuário.
        """
        request_user = request.user
        try:
            followed_user = User.objects.get(id=pk)
            follow = Follow.objects.get(follower=request_user, followed=followed_user)
            follow.delete()
            
            return Response({'detail': 'User unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Follow.DoesNotExist:
            return Response({'detail': 'You are not following this user'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)