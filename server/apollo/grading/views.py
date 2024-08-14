from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Subject, Exam, Grade, SubjectGrade, StudentSubjectGrade
from students.models import Student
from stuents.serializers import StudentSerializer
from .serializers import (
    SubjectSerializer, ExamSerializer, GradeSerializer,
    SubjectGradeSerializer, StudentSubjectGradeSerializer, StudentSubjectGradeCreateSerializer
)
#from .grading import grade_student  # Import the grading function we created earlier

class SubjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ExamViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class GradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class SubjectGradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SubjectGrade.objects.all()
    serializer_class = SubjectGradeSerializer

class StudentSubjectGradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = StudentSubjectGrade.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentSubjectGradeCreateSerializer
        return StudentSubjectGradeSerializer

    @action(detail=False, methods=['post'])
    def grade_exam(self, request):
        student_id = request.data.get('student_id')
        exam_id = request.data.get('exam_id')
        subject_marks = request.data.get('subject_marks')

        if not all([student_id, exam_id, subject_marks]):
            return Response(
                {"error": "Provide student_id, exam_id, and subject_marks"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            grades = grade_student(student_id, exam_id, subject_marks)
            return Response(grades, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
