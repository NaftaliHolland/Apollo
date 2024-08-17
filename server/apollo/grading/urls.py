from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
	SubjectViewSet, ExamViewSet, GradeViewSet, SubjectGradeViewSet, StudentSubjectGradeViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'subject-grades', SubjectGradeViewSet)
router.register(r'grade_exam', StudentSubjectGradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
