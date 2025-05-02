
from post.models import Post


class PostService:
    
    def __init__(self, post_model: Post):
        self.post_model = post_model

    def liked_post (self):
        self.post_model.increment_likes()
        self.post_model.save()
        return self.post_model.count_likes