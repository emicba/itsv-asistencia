from datetime import datetime
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CourseSerializer, StudentSerializer, AttendanceSerializer, ParentSerializer, AllergySerializer, DietSerializer, SubjectMinSerializer, SubjectSerializer
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

    def get_queryset(self):
        subject = self.request.query_params.get('subject', None)
        start_date = self.request.query_params.get('start_date', None)
        if subject and start_date:
            subject_obj = Subject.objects.get(id=subject)
            qs = Attendance.objects.filter(
                subject=subject_obj,
                start_date=start_date
            )
        else:
            qs = Attendance.objects.none()
        return qs


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
    serializer_class = SubjectMinSerializer

    def list(self, request: Request, *args, **kwargs):
        user: User = request.user
        if user.is_superuser:
            subjects = Subject.objects.all()
        else:
            subjects = Subject.objects.filter(teachers=user)

        serializer = SubjectMinSerializer(subjects, many=True, read_only=True)
        return Response(serializer.data)

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self.get_object()
        serializer = SubjectSerializer(instance)
        return Response(serializer.data)
