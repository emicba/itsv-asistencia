from datetime import datetime
from django.http.response import JsonResponse
from rest_framework import viewsets
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CourseSerializer, StudentSerializer, AttendanceSerializer, ParentSerializer, AllergySerializer, DietSerializer, SubjectSerializer
from rest_framework.request import Request
from django.utils.timezone import get_current_timezone

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

    def create(self, request: Request, *args, **kwargs):
        print(request.data)
        try:
            subject_instance = Subject.objects.get(id=request.data['subject'])
            start_date = request.data['start_date']

            for student_id, attended in request.data['students'].items():
                student_instance = Student.objects.get(id=student_id)
                justified = None if attended else request.data['justified'][student_id]
                Attendance.objects.create(
                    student=student_instance,
                    subject=subject_instance,
                    start_date=datetime.fromtimestamp(start_date, tz=get_current_timezone()),
                    attended=attended,
                    justified=justified
                )

            return JsonResponse({'message': 'ok'})
        except AttributeError as ERROR:
            return JsonResponse({'message': str(ERROR)}, status=500)


class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer


class AllergyViewSet(viewsets.ModelViewSet):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer


class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
