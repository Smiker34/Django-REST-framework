from pickle import TRUE
from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday = models.PositiveIntegerField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.first_name
