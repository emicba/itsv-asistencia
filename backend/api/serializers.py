from django.contrib.auth.models import User
from django.db.models import Count, DecimalField
from django.db.models.query_utils import Q
from rest_framework import serializers
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject
from django.db.models.functions import Cast


class CourseMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'status', 'course', 'order')


class StudentMeetsSerializer(StudentSerializer):
    meets = serializers.SerializerMethodField()
    attended_percentage = serializers.SerializerMethodField()
    course = CourseMinSerializer()

    def get_meets(self, obj):
        meets = Attendance.objects.filter(student=obj)
        return AttendanceSerializer(meets, many=True).data

    def get_attended_percentage(self, obj):
        perc = Attendance.objects.aggregate(perc=Cast(Count('pk', filter=Q(student=obj, attended=True)), DecimalField(max_digits=5, decimal_places=2))
                                            / Cast(Count('pk', filter=Q(student=obj)), DecimalField(max_digits=5, decimal_places=2)))
        return round(perc['perc']*100, 2)

    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'status',
                  'course', 'attended_percentage', 'meets')


class StudentMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'order', 'first_name', 'last_name')


class CourseSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    def get_students(self, obj):
        students = Student.objects.filter(course=obj)
        return StudentSerializer(students, many=True, read_only=True).data

    class Meta:
        model = Course
        fields = ('id', 'name', 'students')


class SubjectMinSerializer(serializers.ModelSerializer):
    teachers = serializers.SerializerMethodField()
    course = CourseMinSerializer()

    def get_teachers(self, obj):
        teachers = obj.teachers.all()
        return UserSerializer(teachers, many=True, read_only=True).data

    class Meta:
        model = Subject
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentMinSerializer()
    subject = SubjectMinSerializer()

    class Meta:
        model = Attendance
        fields = ('id', 'start_date', 'attended',
                  'justified', 'student', 'subject')


class AttendanceMinSerializer(serializers.ModelSerializer):
    student = StudentMinSerializer()

    class Meta:
        model = Attendance
        fields = ('id', 'start_date', 'attended',
                  'justified', 'student', 'subject')


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
        fields = ('id','username', 'first_name', 'last_name')


class SubjectSerializer(serializers.ModelSerializer):
    teachers = serializers.SerializerMethodField()
    course = CourseSerializer()
    meets = serializers.SerializerMethodField()

    def get_teachers(self, obj):
        teachers = obj.teachers.all()
        return UserSerializer(teachers, many=True, read_only=True).data

    def get_meets(self, obj):
        meets = Attendance.objects.filter(
            subject=obj).values('start_date').distinct()
        return meets.order_by('-start_date')

    class Meta:
        model = Subject
        fields = '__all__'
