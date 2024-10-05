from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
	SubjectViewSet, ExamViewSet, GradeViewSet, SubjectGradeViewSet, StudentSubjectGradeViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'subject_grades', SubjectGradeViewSet)
router.register(r'student_subject_grades', StudentSubjectGradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
