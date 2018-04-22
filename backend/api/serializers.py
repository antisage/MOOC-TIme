from django.contrib.auth.models import User, Group
from .models import Course, Work, IntervalSession
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'url', 'name')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'start_date', 'end_date', 'calendar_url', 'course_code')


class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ('id', 'course', 'name', 'work_type', 'due_date', 'estimated_time', 'url', 'description')


class IntervalSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervalSession
        fields = ('id', 'work', 'start', 'end')