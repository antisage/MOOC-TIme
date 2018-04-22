from django.db import models
import requests
import shutil
import os

from .calendar_parse import CalendarParse

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
