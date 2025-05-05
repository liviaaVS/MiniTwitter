from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from user.models import User
from user.serializer import UserSerializer, UserCreateSerializer
from user.services import UserService
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.tokens import AccessToken

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'profile_picture': user.picture.url if user.picture else None,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'followers': user.follower_count,  # ou sem parênteses se for propriedade
            'following': user.following_count,
        })

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating and editing user instances.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
   
        return super().get_serializer_class()

    def get_permissions(self):
        """
        Define permissões por ação:
        - create e login: qualquer um
        - list/retrieve: autenticado
        - demais (update, destroy): admin
        """
        if self.action in ['create', 'list']:
            perms = [AllowAny]
        else :
            perms = [IsAuthenticated]
      
        return [p() for p in perms]
    
    def get_authenticators(self):
        if self.request.method == 'POST':
            return []  # ignora autenticação para criação de usuário
        return super().get_authenticators()



    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user_service = UserService(User)

        try:
            user = user_service.create_user(serializer)
            print(user)

            return Response({
                'user': UserSerializer(user).data,
              
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
