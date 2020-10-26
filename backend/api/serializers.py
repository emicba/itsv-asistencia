from rest_framework import serializers
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'


class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = '__all__'


class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
