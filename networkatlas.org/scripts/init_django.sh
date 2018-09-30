#!/usr/bin/env bash

#Delay
sleep 20

# Creamos las migraciones
python manage.py makemigrations

# Aplicamos migraciones
python manage.py migrate

# Recolectamos los ficheros estáticos
python manage.py collectstatic --noinput

# Arrancamos la app con gunicorn
gunicorn kapanyapi.wsgi:application -b 0.0.0.0:80