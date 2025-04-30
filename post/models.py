from django.db import models

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True)  # Adicionando campo de imagem
    count_likes = models.IntegerField(default=0)  # Contagem de likes
    
    def __str__(self):
        return self.titulo