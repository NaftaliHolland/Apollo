from django.urls import path
from . import views

urlpatterns = [
        path('register_school/', views.register_school, name='register_school'),
]
