#!/bin/bash
#Script para subir la app gescuencas al servidor en producción

HOST=server.michogarcia.org
PATH=/opt/kapany/app

echo "Usuario del servidor en Producción con permisos para conectarse:"
read user

echo "rsync -avz --exclude '*.git' --exclude '.*' --exclude '*.md' --exclude '*.pyc' --exclude '*_dev*' --exclude 'docker-compose.override.yml' ../* -e ssh $user@$HOST:$PATH"