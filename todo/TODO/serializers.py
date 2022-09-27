from rest_framework.serializers import ModelSerializer, HyperlinkedRelatedField, StringRelatedField


from .models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    # Всё ещё не разобрался с POST
    # Users = StringRelatedField(many=True)
    # Link = HyperlinkedRelatedField(view_name='Link', read_only=True)

    class Meta:
        model = Project
        fields = ["Title", "Link", "Users"]


class TODOModelSerializer(ModelSerializer):
    # Всё ещё не разобрался с POST
    # project = StringRelatedField()
    # creator = StringRelatedField()

    class Meta:
        model = TODO
        exclude = ('is_active',)
