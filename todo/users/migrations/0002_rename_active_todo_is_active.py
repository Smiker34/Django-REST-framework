# Generated by Django 3.2.8 on 2022-09-27 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='active',
            new_name='is_active',
        ),
    ]
