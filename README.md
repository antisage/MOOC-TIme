# MOOC-TIme

Description
MOOCTime will be a web based application that will be available individual users via an authentication service (local to server or OAuth). 
The application will assist users with
1.	Identifying due dates of assignments
2.	Reading the course syllabus and mapping expected time needed for each assignment/test/quiz
3.	Scheduling time to spend on studying/progressing on assignments/taking tests and quizzes
4.	Teaching productivity via various methods
a.	Task execution via intervals (commonly referred to as the “Pomodoro” technique
b.	Setting goals [2]

## Backend
Python 3 and Django 2.0
Create Virtual Environment and Install Dependencies
```
/> virtualenv env
/> source env/bin/activate
/> pip install -r requirements.txt
```

Create the local database
```
/> cd backend
/> python manage.py migrate
```

Serve the backend up
```
/> cd backend
/> python manage.py runserver 0.0.0.0:8000
```

Angular
## Frontend
Serve the frontend
```
/> cd ng-mooc-time
/> ng serve --open
```

## Various TODO items
- [ ] Add estimated time to work items (user will select, sm, md, lg, xl)
