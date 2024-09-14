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
from django.db import transaction

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

        queryset = Subject.objects.filter(school=school).order_by('-id')
        serializer = self.get_serializer(queryset, many=True)
        return Response({"subjects": serializer.data}, status=status.HTTP_200_OK)


class ExamViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def list(self, request, *args, **kwargs):
        school_id = request.GET.get("school")
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({"error": "School does not exist"}, status=status.HTTP_404_NOT_FOUND)
        queryset = Exam.objects.filter(school=school)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class GradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def list(self, request, *args, **kwargs):
        school_id = request.GET.get("school")
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({"error": "School does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = Grade.objects.filter(school=school)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class SubjectGradeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SubjectGrade.objects.all()
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_upadate']:
            return SubjectGradeCreateSerializer

        return SubjectGradeSerializer

    def list(self, request, *args, **kwargs):
        subject_id = request.GET.get("subject")
        try:
            subject = Subject.objects.get(pk=subject_id)
        except Subject.DoesNotExist:
            return Response({"error": "Subject does not exist"}, status=status.HTTP_404_NOT_FOUND)
        queryset = SubjectGrade.objects.filter(subject = subject)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['PATCH'])
    def batch_update(self, request):
        updates = request.data.get('updates', [])

        with transaction.atomic():
            updated_instances = []
            for update in updates:
                instance_id = update.pop('id', None)
                if instance_id is None:
                    continue
                instance = self.get_queryset().filter(id=instance_id).first()
                if instance:
                    serializer = self.get_serializer(instance, data=update, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    updated_instances.append(serializer.data)
        return Response(updated_instances)

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
