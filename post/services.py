
from post.models import Post


class PostService:
    
    def __init__(self, post_model: Post):
        self.post_model = post_model

    def liked_post (self, post: Post):
        post.increment_likes()
        post.save()
        return post