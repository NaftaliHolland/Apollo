from django.urls import path
from . import views

urlpatterns = [
        path('add_teacher/', views.add_teacher, name='add_teacher'),
        path('get_teachers/', views.get_teachers, name='get_teachers'),
    ]
