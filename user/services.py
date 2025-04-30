from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import User

class UserService:
    """
    Service class for user-related operations.
    """
    
    def __init__(self, user_model):
        self.user_model = user_model
    
    def create_user(self, user_serializer):
        """
        Create a new user.
        """
        user_serializer.is_valid(raise_exception=True)
        password = user_serializer.validated_data.pop('password')
        user = User(**user_serializer.validated_data)
        user.set_password(password)

        user.save()
        return user
    
    def generate_token(self, user):
        """
        Generate a JWT token for the user.
        """
        
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }

