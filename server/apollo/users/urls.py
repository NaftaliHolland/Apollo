from django.urls import path
from . import views

urlpatterns = [
        path('signup/', views.signup, name='signup'),
        path('login/', views.login, name='login'),
        path('create_role/', views.create_role, name='create_role'),
        path('user/', views.UserView.as_view(), name='create_role'),

    ]
