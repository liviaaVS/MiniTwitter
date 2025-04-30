from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set', 
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='custom_user',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set', 
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='custom_user',
    )
    
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    followers = models.IntegerField(default=0, blank=True, null=True)
    
    @property
    def follower_count(self):
        return self.followers.count()