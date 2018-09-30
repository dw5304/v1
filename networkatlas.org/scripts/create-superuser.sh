#!/usr/bin/env bash

echo "Creación del SuperUsuario de Django:"

printf "  Nombre de usuario: "
read -r user

printf "  Mail: "
read -r mail

printf "  Password: "
read -r pass

script="
from django.contrib.auth.models import User;
username = '$user';
password = '$pass';
email = '$mail';
if User.objects.filter(username=username).count()==0:
    User.objects.create_superuser(username, email, password);
    print('Superuser created.');
else:
    print('Superuser creation skipped.');
"
docker-compose exec django python manage.py shell -c "$script"