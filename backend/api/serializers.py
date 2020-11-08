from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'dni', 'address', 'status', 'course')

class StudentMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name')


class CourseSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    def get_students(self, obj):
        students = Student.objects.filter(course=obj)
        return StudentSerializer(students, many=True, read_only=True).data

    class Meta:
        model = Course
        fields = ('id', 'name', 'students')


class CourseMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name')


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentMinSerializer()

    class Meta:
        model = Attendance
        fields = ('id', 'start_date', 'attended', 'justified', 'student', 'subject')


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')


class SubjectMinSerializer(serializers.ModelSerializer):
    teachers = serializers.SerializerMethodField()
    course = CourseMinSerializer()

    def get_teachers(self, obj):
        teachers = obj.teachers.all()
        return UserSerializer(teachers, many=True, read_only=True).data

    class Meta:
        model = Subject
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    teachers = serializers.SerializerMethodField()
    course = CourseSerializer()
    meets = serializers.SerializerMethodField()

    def get_teachers(self, obj):
        teachers = obj.teachers.all()
        return UserSerializer(teachers, many=True, read_only=True).data

    def get_meets(self, obj):
        meets = Attendance.objects.filter(subject=obj).values('start_date').distinct()
        return meets.order_by('-start_date')

    class Meta:
        model = Subject
        fields = '__all__'
