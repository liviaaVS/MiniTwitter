from follow.models import Follow


class FollowService:
    def __init__(self):
        self.follow_model= Follow()

    def follow_user(self, follower_id, followed_id):
        if(follower_id == followed_id):
            raise ValueError("You cannot follow yourself.")
        
        if self.follow_model.objects.filter(follower_id=follower_id, followed_id=followed_id).exists():
            raise ValueError("You are already following this user.")
    

        self.follow_model(
            follower_id=follower_id,
            following_id=followed_id
        )
        self.follow_model.save()


    def unfollow_user(self, follower_id, followed_id):
        # Logic to unfollow a user
        pass

    def get_followers(self, user_id):
        # Logic to get followers of a user
        pass

    def get_following(self, user_id):
        # Logic to get users that the user is following
        pass