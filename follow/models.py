from django.db import models

from cacatalks.settings import AUTH_USER_MODEL

# Create your models here.
class Follow(models.Model):
    id = models.AutoField(primary_key=True)
    follower = models.ForeignKey(AUTH_USER_MODEL, related_name='follower', on_delete=models.CASCADE)
    following = models.ForeignKey(AUTH_USER_MODEL, related_name='following', on_delete=models.CASCADE)
    date_request = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.follower.username + ' follows ' + self.following.username
