from rest_framework import serializers
from .models import Subject, Exam, Grade, SubjectGrade, StudentSubjectGrade
from classes.models import Class
from students.serializers import StudentSerializer
from students.models import Student
from classes.serializers import ClassSerializer

class SubjectSerializer(serializers.ModelSerializer):
    classes = serializers.PrimaryKeyRelatedField(many=True, queryset=Class.objects.all(), required=False)

    class Meta:
        model = Subject
        fields = '__all__'

    def create(self, validated_data):
        classes_data = validated_data.pop('classes', [])
        subject = Subject.objects.create(**validated_data)
        for class_data in classes_data:
            class_data.subjects.add(subject)
        return subject

class SubjectGetSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many=True, read_only=True)

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
class SubjectGradeCreateSerializer(serializers.ModelSerializer):
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
        fields = ['student', 'exam', 'subject', 'score']

