from user.models import User
from follow.models import Follow


class FollowService:
    def __init__(self):
        self.follow_model= Follow()

    def follow_user(self, follower_id, followed_id):
        if(follower_id == followed_id):
            raise ValueError("You cannot follow yourself.")
        
        if self.follow_model.objects.filter(follower_id=follower_id, followed_id=followed_id).exists():
            raise ValueError("You are already following this user.")
    

        instance = self.follow_model(
            follower_id=follower_id,
            following_id=followed_id
        )
        instance.save()


    def unfollow_user(self, follower_id, followed_id):
        
        followed_deleted = Follow.objects.filter(
            follower_id=followed_id,
            followed_id=follower_id
        ).delete()
        followed_deleted.save()

        return followed_deleted

    def get_followers(self, user_id):
        # Logic to get followers of a user
        user = User.objects.get(id=user_id)
        followers = user.follower_users.all()
        return followers

    def get_following(self, user_id):
        user = User.objects.get(id=user_id)
        following = user.following_users.all()
        return following