from django.shortcuts import render
from rest_framework import viewsets, generics, views
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api import serializers, models


class CableViewSet(viewsets.ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    #authentication_classes = (JSONWebTokenAuthentication,)

    queryset = models.Cable.objects.all()
    serializer_class = serializers.CableSerializer


class LandingPointViewSet(viewsets.ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    #authentication_classes = (JSONWebTokenAuthentication,)

    queryset = models.LandingPoint.objects.all()
    serializer_class = serializers.LandingPointSerializer


class CountryViewSet(viewsets.ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    #authentication_classes = (JSONWebTokenAuthentication,)

    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer