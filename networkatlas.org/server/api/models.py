from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.contrib.gis.db import models


class Country(models.Model):

    code = models.CharField(primary_key=True, max_length=2)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Cable(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    id = models.IntegerField(primary_key=True)
    cable_id = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    status = models.IntegerField()
    rfs = models.DateField()
    geom = models.MultiLineStringField()


    def __str__(self):
        return self.cable_id

    class Meta:
        verbose_name = _('Cable')
        verbose_name_plural = _('Cables')


class LandingPoint(models.Model):

    cables = models.ManyToManyField(Cable, blank=True)
    id = models.IntegerField(primary_key=True)
    city_id = models.CharField(max_length=50)
    latitude = models.FloatField(blank=False)
    longitude = models.FloatField(blank=False)
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    geom = models.PointField()
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.city_id

    class Meta:
        verbose_name = _('Landing Point')
        verbose_name_plural = _('Landing Points')






