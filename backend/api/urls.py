from django.urls import include, path
from rest_framework import routers
from .views import CourseViewSet, StudentViewSet, AttendanceViewSet, ParentViewSet, AllergyViewSet, DietViewSet, SubjectViewSet
from rest_framework.authtoken import views as auth_views

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'attendances', AttendanceViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'allergies', AllergyViewSet)
router.register(r'diets', DietViewSet)
router.register('subjects', SubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', auth_views.obtain_auth_token)
]
