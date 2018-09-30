FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.pip /code/
RUN pip install -r requirements.pip

#Dependencias de geodjango
RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin

#ADD ./server/ /code/
ADD ./scripts/init_django.sh /scripts/init_django.sh