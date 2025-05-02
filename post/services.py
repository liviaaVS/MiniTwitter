
from post.models import Post


class PostService:
    
    def __init__(self, post_model: Post):
        self.post_model = post_model

    def liked_post (self, post_id):
        """
        Adiciona um like ao post com o ID fornecido.
        """
        try:
            post = self.post_model.get_post_by_id(post_id)
            if not post:
                raise ValueError("Post not found")
            
            post.count_likes += 1
            self.post_model.save()
            return post
        
        except Exception as e:
            raise e