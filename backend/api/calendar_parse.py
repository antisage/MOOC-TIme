from icalendar import Calendar, Event, vDatetime
from datetime import datetime
from pytz import UTC # timezone

class CalendarParse:

    def parse_events(calendar_path):
        g = open(calendar_path, 'rb')
        gcal = Calendar.from_ical(g.read())
        calendar = {}
        for key, value in gcal.items():
            calendar[str(key)] = str(value)
        calendar['events'] = []
        for sub in gcal.subcomponents:
            event = {}
            for k, v in sub.items():
                if str(k)[0:2] == 'DT':
                    v = v.from_ical(v)
                event[str(k)] = v
            calendar['events'].append(event)
        g.close()
        return calendar