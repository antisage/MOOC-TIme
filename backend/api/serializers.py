from django.contrib.auth.models import User, Group
from .models import Course, Work, IntervalSession
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'start_date', 'end_date', 'calendar_url')


class WorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Work
        fields = ('course', 'work_type', 'due_date')


class IntervalSessionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IntervalSession
        fields = ('work', 'start', 'end')