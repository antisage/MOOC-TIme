from django.db import models
import requests
import shutil
import os
import tempfile

from .calendar_parse import CalendarParse
from icalendar import Calendar, Event, vDatetime
from datetime import datetime
from pytz import UTC # timezone


def download_save_file(url):
    r = requests.get(url, auth=('usrname', 'password'), verify=False,stream=True)
    r.raw.decode_content = True
    with open("calendar.ics", 'wb') as f:
        shutil.copyfileobj(r.raw, f)
        return os.path.realpath(f.name)

class Course(models.Model):
    name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=10, default='')
    start_date = models.DateField()
    end_date = models.DateField()
    calendar_url = models.CharField(max_length=400, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def get_possible_events(self):
        saved_calendar = download_save_file(self.calendar_url)
        return CalendarParse.parse_events(saved_calendar)

    def get_calendar(self):
        cal = Calendar()
        directory = tempfile.mkdtemp()
        work = Work.objects.all().filter(course__id=self.id)
        for work_item in work:
            sessions = IntervalSession.objects.all().filter(work__id=work_item.id)
            for session in sessions:
                event = Event()
                event.add('summary', 'Interval Session for ' + work_item.name)
                event.add('dtstart', session.start)
                event.add('dtend', session.end)
                event.add('dtstamp', session.start)
                cal.add_component(event)
        f = open(os.path.join(directory, 'MOOCCalendar.ics'), 'wb')
        f.write(cal.to_ical())
        f.close()
        return f.name


WORK_TYPE_CHOICES = (
    ('assignment', 'Assignment'),
    ('quiz', 'Quiz'),
    ('test', 'Test'),
    ('other', 'Other'),
)
class Work(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    work_type = models.CharField(max_length=25, choices=WORK_TYPE_CHOICES, default=WORK_TYPE_CHOICES[0][0])
    estimated_time = models.IntegerField()
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=800, default='')
    url = models.CharField(max_length=200, default='')
    due_date = models.DateField()


class IntervalSession(models.Model):
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
