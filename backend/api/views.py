from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .models import Course, Work, IntervalSession
from api.serializers import UserSerializer, \
                            GroupSerializer, \
                            CourseSerializer, \
                            WorkSerializer, \
                            IntervalSessionSerializer
from django.http import JsonResponse, FileResponse



def get_possible_work_events(request, id):
    print(id)
    target_course = Course.objects.get(id=id)
    return JsonResponse(target_course.get_possible_events(), safe=False)


def get_calendar(request):
    course_id = request.GET['course_id']
    if course_id is not None:
        course = Course.objects.all().filter(id=course_id)
        print(course)
        response = FileResponse(open(course[0].get_calendar(), 'rb'))
        response['Content-Disposition'] = 'attachment; filename="MOOCCalendar.ics"'
        return response


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
    serializer_class = WorkSerializer

    
    def get_queryset(self):
        queryset = Work.objects.all().order_by('due_date')
        course_id = self.request.query_params.get('course_id', None)
        if course_id is not None:
            queryset = queryset.filter(course__id=course_id)
        return queryset


class IntervalSessionViewSet(viewsets.ModelViewSet):
    queryset = IntervalSession.objects.all()
    serializer_class = IntervalSessionSerializer
