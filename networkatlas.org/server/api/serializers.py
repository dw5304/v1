from django.contrib.auth.models import User
from api import models
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')


class CableSerializer(GeoFeatureModelSerializer):

    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = models.Cable
        geo_field = "geom"
        fields = ('id', 'cable_id', 'name', 'company', 'status', 'rfs', 'user')


class LandingPointSerializer(GeoFeatureModelSerializer):

    cables = CableSerializer(many=True, read_only=True)

    class Meta:
        model = models.LandingPoint
        geo_field = "geom"
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = "__all__"