from dataclasses import fields
from rest_framework.serializers import ModelSerializer


from .models import Users


class UserModelSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = ['first_name', 'last_name', 'birthday', 'email']


class UpdatedUserModelSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = ['first_name', 'last_name', 'birthday',
                  'email', 'is_superuser', 'is_staff']
