from rest_framework import serializers
from .models import Subject, Exam, Grade, SubjectGrade, StudentSubjectGrade
from students.serializers import StudentSerializer

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class SubjectGradeSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    grade = GradeSerializer(read_only=True)

    class Meta:
        model = SubjectGrade
        fields = '__all__'

class StudentSubjectGradeSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    exam = ExamSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = StudentSubjectGrade
        fields = '__all__'

class StudentSubjectGradeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectGrade
        fields = ['student', 'exam', 'subject', 'marks']
