from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Subject, Exam, Grade, SubjectGrade, StudentSubjectGrade
from students.models import Student
from schools.models import School
from students.serializers import StudentSerializer
from .serializers import (
    SubjectSerializer, ExamSerializer, GradeSerializer, SubjectGradeSerializer, SubjectGradeCreateSerializer, StudentSubjectGradeSerializer, StudentSubjectGradeCreateSerializer
)
from .utils import grade_student

class SubjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def list(self, request, *args, **kwargs):
        school_id = request.GET.get("school_id")
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({"message": "School with provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = Subject.objects.filter(school=school)
        serializer = self.get_serializer(queryset, many=True)
        return Response({"subjects": serializer.data}, status=status.HTTP_200_OK)

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
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_upadate']:
            return SubjectGradeCreateSerializer

        return SubjectGradeSerializer

class StudentSubjectGradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = StudentSubjectGrade.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentSubjectGradeCreateSerializer
        return StudentSubjectGradeSerializer

    def create(self, request, *args, **kwargs):
        if 'subject_marks' in request.data:
            return self.grade_exam(request)
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['post'])
    def grade_exam(self, request):
        student = request.data.get('student')
        exam = request.data.get('exam')
        subject_marks = request.data.get('subject_marks')

        if not all([student, exam, subject_marks]):
            return Response(
                {"error": "Provide student_id, exam_id, and subject_marks"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            grades = grade_student(student, exam, subject_marks)
            return Response(grades, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
