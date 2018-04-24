from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from api import views
from .views import get_possible_work_events, get_calendar
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import serializers, status
import rest_framework.views
from rest_framework.response import Response

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'courses', views.CourseViewSet, base_name='courses')
router.register(r'works', views.WorkViewSet, base_name='works')
router.register(r'interval-sessions', views.IntervalSessionViewSet, base_name='interval_sessions')

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
class EchoView(rest_framework.views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^schema/$', get_schema_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^auth/token/$', TokenObtainPairView.as_view()),
    url(r'^auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^echo/$', EchoView.as_view()),

    path('course/calendar-events/<int:id>/', get_possible_work_events),
    path('generate-calendar/', get_calendar),
]