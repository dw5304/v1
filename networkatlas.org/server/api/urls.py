from rest_framework import routers
from django.urls import path, include
from api import views

router = routers.DefaultRouter()
router.register('landingpoints', views.LandingPointViewSet)
router.register('cables', views.CableViewSet)
router.register('countries', views.CountryViewSet)


urlpatterns = [
    path(r'', include(router.urls)),

]