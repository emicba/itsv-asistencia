from rest_framework import serializers
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'dni', 'address', 'status', 'course')


class CourseSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    def get_students(self, obj):
        students = Student.objects.filter(course=obj)
        return StudentSerializer(students, many=True, read_only=True).data

    class Meta:
        model = Course
        fields = ('id', 'name', 'students')


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
