import graphene
from graphene_django import DjangoObjectType
from TODO.models import TODO, Project
from users.models import Users


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
