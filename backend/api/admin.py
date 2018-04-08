from django.contrib import admin

from .models import Course, Work, IntervalSession

admin.site.register(Course)
admin.site.register(Work)
admin.site.register(IntervalSession)