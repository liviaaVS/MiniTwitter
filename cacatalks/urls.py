from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from post.urls import posts_urls
from user.urls import users_urls

# Definindo a visualização do esquema Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation with Swagger",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="liviavitoria.work@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),  # Permite o acesso público
)

# URLs relacionadas à API de autenticação e usuários
api_urls = [
    path('', include(users_urls)),  # Inclui URLs de usuários
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obter token
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refresh token
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Endpoint para verificar token
    path('', include(posts_urls)),  # Inclui URLs dos posts
]

# URLs principais do projeto
urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # Swagger UI
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # Redoc UI
    path('admin/', admin.site.urls),  # Admin do Django
    path('api/v1/', include(api_urls)),  # Endpoints da API
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve arquivos de mídia no modo de desenvolvimento
