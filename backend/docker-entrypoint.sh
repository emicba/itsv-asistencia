#!/bin/sh
set -xe

python manage.py makemigrations --no-input
python manage.py migrate --no-input

python manage.py 01_add_courses

gunicorn --bind :8000 --workers 3 config.wsgi
