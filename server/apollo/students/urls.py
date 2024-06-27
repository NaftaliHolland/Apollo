from django.urls import path
from. import views

urlpatterns = [
        path('create_parent/', views.create_parent, name='create_parent'),
    ]
