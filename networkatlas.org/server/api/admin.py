from django.contrib import admin
from api import models
# Register your models here.

admin.site.register(models.Country)
admin.site.register(models.Cable)
admin.site.register(models.LandingPoint)

