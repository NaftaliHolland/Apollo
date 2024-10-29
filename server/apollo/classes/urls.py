from django.urls import path
from . import views
from students.views import add_student

urlpatterns = [
        path('', views.ClassView.as_view(), name='classes'),
        path('count', views.ClassView.as_view(), name='class_count'),
        path('<int:id>/', views.ClassDetailView.as_view(), name='class'),
        path('<int:id>/add_student', add_student, name='add_student'),
    ]
