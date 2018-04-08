from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .models import Course, Work, IntervalSession
from api.serializers import UserSerializer, \
                            GroupSerializer, \
                            CourseSerializer, \
                            WorkSerializer, \
                            IntervalSessionSerializer
from django.http import JsonResponse


def get_possible_work_events(request, id):
    print(id)
    target_course = Course.objects.get(id=id)
    return JsonResponse(target_course.get_possible_events())


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer


class IntervalSessionViewSet(viewsets.ModelViewSet):
    queryset = IntervalSession.objects.all()
    serializer_class = IntervalSessionSerializer
