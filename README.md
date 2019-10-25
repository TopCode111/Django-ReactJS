## Summary
MVP for telemedicine, known as **Monica**.

## Instructions
For running django backend

    pip3 install django
    pip3 install djangorestframework
    pip3 install django-rest-knox
    
    python3 manage.py migrate
    python3 manage.py runserver (or python3 manage.py runserver 0.0.0.0:8000 on AWS)

For builiding frontend:

    npm install
    npm run build or npm run dev

Browse http://127.0.0.1:8000.

The API functions are in:

    authentication/api.py
    authentication/urls.py

## Users

* doctor_1@test.com (12345678)
* patient_1@test.com (12345678)
