from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
	SubjectViewSet, ExamViewSet, GradeViewSet, SubjectGradeViewSet, StudentSujectGradeViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'subject-grades', SubjectGradeViewSet)
router.register(r'student-subject-grades', StudentSubjectGradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
