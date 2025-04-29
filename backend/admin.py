from django.contrib import admin
from backend.models import Post, Like, Follow
# Register your models here.

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.site_header = "Cacatalks Admin"
admin.site.site_title = "Cacatalks Admin Portal"
admin.site.index_title = "Welcome to Cacatalks Admin Portal"