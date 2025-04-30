from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action

from user.models import User
from user.serializer import UserSerializer, UserCreateSerializer, LoginSerializer
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
        if self.action == 'login':
            return LoginSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        """
        Define permissões por ação:
        - create e login: qualquer um
        - list/retrieve: autenticado
        - demais (update, destroy): admin
        """
        if self.action in ['create', 'login']:
            perms = [AllowAny]
        elif self.action in ['list', 'retrieve']:
            perms = [IsAuthenticated]
        else:
            perms = [IsAdminUser]
        return [p() for p in perms]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user_service = UserService(User)
        try:
            user = user_service.create_user(serializer)
            tokens = user_service.generate_token(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': tokens['access'],
                'refresh': tokens['refresh'],
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extrai credenciais do serializer validado
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user_service = UserService(User)
        try:
            user = user_service.authenticate_user(username, password)
            tokens = user_service.generate_token(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': tokens['access'],
                'refresh': tokens['refresh'],
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
