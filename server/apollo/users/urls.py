from django.urls import path
from . import views

urlpatterns = [
        path('signup/', views.signup, name='signup'),
        path('login/', views.login, name='login'),
        path('create_role/', views.create_role, name='create_role'),
    ]
