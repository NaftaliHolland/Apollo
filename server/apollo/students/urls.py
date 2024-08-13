from django.urls import path
from. import views

urlpatterns = [
        path('create_parent/', views.create_parent, name='create_parent'),
        path('get_students/<int:class_id>/<int:school_id>/', views.get_students, name='get_students'),
        path('count/', views.get_student_count, name="get_students_count"),
    ]
