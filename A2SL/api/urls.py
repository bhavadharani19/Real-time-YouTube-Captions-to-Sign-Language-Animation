from django.urls import path
from .views import animation_view

urlpatterns = [
    path('animation/', animation_view, name='api_animation'),
]