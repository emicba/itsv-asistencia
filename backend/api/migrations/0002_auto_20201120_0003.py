# Generated by Django 3.0.7 on 2020-11-20 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='student',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='subject',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
