# Generated by Django 3.0.7 on 2020-11-10 21:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('1A', '1er Año "A"'), ('1B', '1er Año "B"'), ('1C', '1er Año "C"'), ('2A', '2er Año "A"'), ('2B', '2er Año "B"'), ('2C', '2er Año "C"'), ('3A', '3er Año "A"'), ('3B', '3er Año "B"'), ('3C', '3er Año "C"'), ('4A', '4er Año "A"'), ('4B', '4er Año "B"'), ('4C', '4er Año "C"'), ('5A', '5er Año "A"'), ('5B', '5er Año "B"'), ('5C', '5er Año "C"'), ('6A', '6er Año "A"'), ('6B', '6er Año "B"'), ('6C', '6er Año "C"'), ('7A', '7er Año "A"'), ('7B', '7er Año "B"'), ('7C', '7er Año "C"')], max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Course')),
                ('teachers', models.ManyToManyField(related_name='teachers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('dni', models.CharField(blank=True, max_length=8, null=True, unique=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.IntegerField(choices=[(1, 'CURSANDO'), (2, 'EGRESADO'), (3, 'SALIDO CON PASE'), (4, 'SALIDO SIN PASE')], default=1)),
                ('order', models.SmallIntegerField(default=1)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('contact', models.CharField(max_length=30)),
                ('address', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Student')),
            ],
        ),
        migrations.CreateModel(
            name='Diet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Student')),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField()),
                ('attended', models.BooleanField(default=True)),
                ('justified', models.BooleanField(default=None, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Student')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Subject')),
            ],
        ),
        migrations.CreateModel(
            name='Allergy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Student')),
            ],
        ),
    ]
