from django.urls import include, path
from rest_framework import routers
from .views import CourseViewSet, StudentViewSet, AttendanceViewSet, ParentViewSet, AllergyViewSet, DietViewSet

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'attendances', AttendanceViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'allergies', AllergyViewSet)
router.register(r'diets', DietViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]