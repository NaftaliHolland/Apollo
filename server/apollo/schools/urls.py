from django.urls import path, include
from . import views
from staff.views import TeachersView

urlpatterns = [
        path('register_school/', views.register_school, name='register_school'),
        path('<int:id>/teachers', TeachersView.as_view(), name="teachers"),
        path('<int:id>/classes', include('classes.urls'), name="classes"),
        path('<int:id>/students', include('students.urls'), name="students"),
]
