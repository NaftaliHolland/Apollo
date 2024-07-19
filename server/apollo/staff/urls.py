from django.urls import path
from . import views

urlpatterns = [
        path('create_role/', views.create_role, name='create_role'),
        path('create_staff/', views.create_staff, name='craate_staff'),
        path('add_teacher/', views.add_teacher, name='add_teacher'),
        path('get_teachers/', views.get_teachers, name='get_teachers'),
    ]
