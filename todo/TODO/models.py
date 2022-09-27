from django.db import models
from users.models import User


class Project(models.Model):
    Title = models.CharField(max_length=1024, unique=True)
    Link = models.URLField(blank=True)
    Users = models.ManyToManyField(User)

    def __str__(self):
        return self.Title


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    note = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True, blank=True)
    change_date = models.DateTimeField(auto_now=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
