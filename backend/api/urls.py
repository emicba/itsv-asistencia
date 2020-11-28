from django.urls import include, path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import RootView, CourseViewSet, StudentViewSet, AttendanceViewSet, ParentViewSet, AllergyViewSet, DietViewSet, SubjectViewSet, TeacherViewSet, ObtainAuthToken

router: DefaultRouter = routers.DefaultRouter()
router.APIRootView = RootView
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'attendances', AttendanceViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'allergies', AllergyViewSet)
router.register(r'diets', DietViewSet)
router.register('subjects', SubjectViewSet)
router.register('teachers', TeacherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', ObtainAuthToken.as_view())
]
