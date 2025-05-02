from django.test import TestCase
from user.models import User
from follow.models import Follow

class FollowModelTests(TestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(
            username='alice',
            password='senha123',
            email='alice@example.com'
        )
        self.user2 = User.objects.create_user(
            username='bob',
            password='senha456',
            email='bob@example.com'
        )

        self.follow = Follow.objects.create(
            follower=self.user1,
            followed=self.user2
        )

    def test_follow_creation(self):
        self.assertEqual(self.follow.follower.username, 'alice')
        self.assertEqual(self.follow.followed.username, 'bob')

    def test_user_following_count(self):
        following = Follow.objects.filter(follower=self.user1).count()
        self.assertEqual(following, 1)

    def test_user_follower_count(self):
        followers = Follow.objects.filter(followed=self.user2).count()
        self.assertEqual(followers, 1)
