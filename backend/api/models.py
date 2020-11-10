from django.db import models
from .models_choices import (
    COURSES_CHOICES,
    STUDENT_STATUS_CHOICES,
    ATTENDEDS_CHOICES,
)
from django.contrib.auth.models import User
from django.utils.timezone import now


class Course(models.Model):
    name = models.CharField(max_length=2, choices=COURSES_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dni = models.CharField(max_length=8, unique=True, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.IntegerField(choices=STUDENT_STATUS_CHOICES, default=1)
    order = models.SmallIntegerField(default=1)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Parent(models.Model):
    student_id = models.ForeignKey(Student,on_delete=models.DO_NOTHING)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    contact = models.CharField(max_length=30)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.contact})'


class Allergy(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    description = models.TextField()

    def __str__(self):
        return self.description


class Diet(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    description = models.TextField()

    def __str__(self):
        return self.description


class Subject(models.Model):
    name = models.CharField(max_length=25)
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    teachers = models.ManyToManyField(User, related_name='teachers')


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    subject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    start_date = models.DateTimeField()
    attended = models.BooleanField(default=True)
    justified = models.BooleanField(default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
