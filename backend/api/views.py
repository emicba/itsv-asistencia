from rest_framework import viewsets
from .models import Course, Student, Attendance, Parent, Allergy, Diet
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CourseSerializer, StudentSerializer, AttendanceSerializer, ParentSerializer, AllergySerializer, DietSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course_id']


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer


class AllergyViewSet(viewsets.ModelViewSet):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer


class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
