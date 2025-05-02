from django.core.files.uploadedfile import SimpleUploadedFile
import datetime
from django.test import TestCase
from django.utils import timezone
from post.models import Post
import shutil
import tempfile
from django.test import override_settings
from django.conf import settings

from user.models import User 

@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class PostTests(TestCase):

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(settings.MEDIA_ROOT, ignore_errors=True)
        super().tearDownClass()

    def setUp(self):
        # Cria uma imagem simulada em memória (não precisa de arquivo real)
        image_data = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        
        self.test_image = SimpleUploadedFile(
            name='test_image.gif',
            content=image_data,
            content_type='image/gif'
        )

        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='user@exemplo.com'
        )
        self.user.save()
        
        self.post = Post.objects.create(
            title="Test Post",
            content="This is a test post.",
            date_created=timezone.now(),
            author=self.user,
            image=self.test_image,  # Corrigido aqui (adicionado self.)
            count_likes=0,
        )

    def test_post_creation(self):
        self.assertEqual(self.post.title, "Test Post")
        self.assertEqual(self.post.content, "This is a test post.")
        self.assertIsInstance(self.post.date_created, datetime.datetime)
        self.assertEqual(self.post.author_id, self.user.id)
       