import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from TODO.views import ProjectModelViewSet, TODOModelViewSet
from TODO.models import Project, TODO
from users.models import Users


class TestProjectModelViewSet(TestCase):
    def test_create_guest(self):
        user = Users.objects.create(
            first_name='user1', last_name='test', birthday='1990', email='test@test.com')

        factory = APIRequestFactory()
        request = factory.post(
            '/api/Project/', {'Title': 'Some_Title', 'Users': [1]}, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        user = Users.objects.create(
            first_name='user1', last_name='test', birthday='1990', email='test@test.com')

        client = APIClient()
        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin123')
        client.login(username='admin', password='admin123')

        response = client.post(
            '/api/Project/', {'Title': 'Some_Title', 'Users': [1]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTODOModelViewSet(APITestCase):

    def test_create_guest(self):
        user = mixer.blend(Users)
        project = mixer.blend(Project)

        response = self.client.post(
            '/api/TODO/', {'note': 'Some_note_changes', 'project': 1, 'creator': 1})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        user = mixer.blend(Users)
        project = mixer.blend(Project)

        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin123')
        self.client.login(username='admin', password='admin123')

        response = self.client.post(
            '/api/TODO/', {'note': 'Some_note_changes', 'project': 1, 'creator': 1})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
