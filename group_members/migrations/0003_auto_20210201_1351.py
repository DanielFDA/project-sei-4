# Generated by Django 3.1.5 on 2021-02-01 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group_members', '0002_auto_20210201_1016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupmember',
            name='role',
            field=models.CharField(choices=[('Manager', 'Manager'), ('Developer', 'Developer')], default='Developer', max_length=15),
        ),
    ]