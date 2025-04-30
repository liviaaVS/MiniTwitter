from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action

from user.models import User
from user.serializer import UserSerializer, UserCreateSerializer
from user.services import UserService


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
        if self.action in ['create', 'login', 'list']:
            perms = [AllowAny]
        elif self.action in [ 'retrieve']:
            perms = [IsAuthenticated]
        else:
            perms = [IsAdminUser]
        return [p() for p in perms]

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

    
