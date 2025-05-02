from django.db import models

from cacatalks.settings import AUTH_USER_MODEL

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    image = models.ImageField( upload_to='posts_pictures/', null=True, blank=True,
        verbose_name='Posts Picture') 
    count_likes = models.BigIntegerField(default=0)
    
    def __str__(self):
        return self.titulo

    def increment_likes(self):
        self.count_likes += 1
        self.save()