from rest_framework.serializers import ModelSerializer, HyperlinkedRelatedField, StringRelatedField


from .models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    # В расскомментированном варианте более коректное отображение (не id), но нет полей ввода.
    # Я писал с этим преподавателю, но он просто скинул репозиторий с готовым заданием, где всё также.
    # Users = StringRelatedField(many=True)
    # Link = HyperlinkedRelatedField(view_name='Link', read_only=True)

    class Meta:
        model = Project
        fields = ["Title", "Link", "Users"]


class TODOModelSerializer(ModelSerializer):
    # Здесь тоже самое
    # project = StringRelatedField()
    # creator = StringRelatedField()

    class Meta:
        model = TODO
        exclude = ('is_active',)
