from django.urls import path
from. import views

urlpatterns = [
        path('create_parent/', views.create_parent, name='create_parent'),
        path('add_student/', views.add_student, name='add_student'),
    ]
