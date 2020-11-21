from datetime import datetime
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.routers import APIRootView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Course, Student, Attendance, Parent, Allergy, Diet, Subject
from .serializers import CourseSerializer, StudentMeetsSerializer, StudentSerializer, AttendanceMinSerializer, ParentSerializer, AllergySerializer, DietSerializer, SubjectMinSerializer, SubjectSerializer, UserSerializer
from rest_framework.request import Request
from django.utils.timezone import get_current_timezone
from rest_framework import status


class RootView(APIRootView):
    def get(self, request, *args, **kwargs):
        return Response(status=HTTP_200_OK)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.filter(active=True)
    serializer_class = StudentSerializer

    def get_serializer(self, instance=None, data=None, many=False, *args, **kwargs):
        if data == None:
            return super().get_serializer(
                instance=instance,
                many=False,
                *args,
                **kwargs
            )
        else:
            return super().get_serializer(
                data=data,
                many=isinstance(instance, list) or isinstance(data, list),
                *args,
                **kwargs)

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self.get_object()
        serializer = StudentMeetsSerializer(instance)
        meets = Attendance.objects.filter(
            student=instance).order_by('-start_date')
        serializer.data['meets'] = AttendanceMinSerializer(
            instance=meets, many=True).data
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if isinstance(request.data, list):
            Student.objects.bulk_create([
                Student(order=x['order'],
                        first_name=x['first_name'],
                        last_name=x['last_name'],
                        course_id=x['course'],
                        status=x['status']) for x in request.data])
        else:
            self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceMinSerializer

    def create(self, request: Request, *args, **kwargs):
        try:
            subject_id = request.data['subject']
            start_date = request.data['start_date']
            result = []

            for student_id, attended in request.data['students'].items():
                justified = None if attended else request.data['justified'][student_id]
                result.append(Attendance(student_id=student_id,
                                      subject_id=subject_id,
                                      start_date=datetime.fromtimestamp(
                                          start_date, tz=get_current_timezone()),
                                      attended=attended,
                                      justified=justified))

            Attendance.objects.bulk_create(result)
            return JsonResponse({'message': 'ok'}, status=status.HTTP_200_OK)
        except AttributeError as ERROR:
            return JsonResponse({'message': str(ERROR)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_queryset(self):
        subject = self.request.query_params.get('subject', None)
        start_date = self.request.query_params.get('start_date', None)
        if subject and start_date:
            subject_obj = Subject.objects.get(id=subject)
            qs = Attendance.objects.filter(
                subject=subject_obj,
                start_date=start_date
            ).order_by('student__order', 'student__last_name', 'student__first_name')
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
    queryset = Subject.objects.filter(active=True)
    serializer_class = SubjectMinSerializer

    def list(self, request: Request, *args, **kwargs):
        user: User = request.user
        if user.is_staff:
            subjects = Subject.objects.filter(active=True)
        else:
            subjects = Subject.objects.filter(teachers=user, active=True)

        serializer = SubjectMinSerializer(subjects, many=True, read_only=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self.get_object()
        serializer = SubjectSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request: Request, *args, **kwargs):
        name = request.data.get('name')
        course = request.data.get('course')
        if name and course:
            try:
                course_instance = Course.objects.get(name=course)
                instance = Subject.objects.create(
                    course=course_instance, name=name)
                serializer = SubjectMinSerializer(instance)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Course.DoesNotExist:
                return Response({'message': 'Invalid course.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'message': 'Name and course must be provided.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        operation = request.data.get('op')
        path = request.data.get('path')
        value = request.data.get('value')
        if (path == 'teachers' and value.get('username')):
            if (operation == 'add'):
                try:
                    user = User.objects.get(username=value.get('username'))
                except User.DoesNotExist:
                    return Response({'message': 'User doesn\'t exist'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                instance: Subject = self.get_object()
                instance.teachers.add(user)
                return Response({'message': 'ok'}, status=status.HTTP_200_OK)
            elif (operation == 'remove'):
                try:
                    user = User.objects.get(username=value.get('username'))
                except User.DoesNotExist:
                    return Response({'message': 'User doesn\'t exist'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                instance: Subject = self.get_object()
                instance.teachers.remove(user)
                return Response({'message': 'ok'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Operation not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request: Request, *args, **kwargs):
        username = request.data.get('username')
        last_name = request.data.get('last_name')
        first_name = request.data.get('first_name')
        password = request.data.get('password')
        admin = request.data.get('is_staff')
        if username and last_name and first_name and password:
            if (admin == True):
                instance = User.objects.create_user(
                    username, first_name=first_name, last_name=last_name, password=password)
                instance.is_staff = True
            else:
                instance = User.objects.create_user(
                    username, first_name=first_name, last_name=last_name, password=password)
            instance.save()
            serializer = UserSerializer(instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'All fields must be provided.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request: Request, *args, **kwargs):
        instance: User = self.get_object()
        serializer: UserSerializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if (serializer.is_valid()):
            if not request.data.get('password', False):
                return super().partial_update(request, *args, **kwargs)
            else:
                instance.set_password(request.data.get('password'))
                instance.save()
                if (hasattr(instance, 'auth_token')):
                    instance.auth_token.delete()
                return Response(serializer.data, status=HTTP_200_OK)
        return Response({'message': 'Can\'t update user', 'errors': serializer.error_messages}, status=HTTP_400_BAD_REQUEST)
