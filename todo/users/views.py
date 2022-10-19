from re import T
from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions

from .models import Users
from .serializers import UserModelSerializer, UpdatedUserModelSerializer


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UpdatedUserModelSerializer
        return UserModelSerializer
