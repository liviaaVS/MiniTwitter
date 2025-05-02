from django.db import models

from cacatalks.settings import AUTH_USER_MODEL
from user.models import User

# Create your models here.
class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='following_set', on_delete=models.CASCADE)
    followed = models.ForeignKey(User, related_name='follower_set', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.follower.username + ' follows ' + self.following.username
