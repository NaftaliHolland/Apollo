from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer, ParentSerializer, StudentDetailSerializer
from .models import *
from classes.serializers import ClassSerializer
from schools.models import School
from django.shortcuts import get_object_or_404
from grading.models import Exam, StudentSubjectGrade
from grading.serializers import StudentSubjectGradeSerializer
from django.db.models import Prefetch
from users.models import User, Role
from django.db import transaction

@api_view(['POST'])
def create_parent(request):
    serializer = ParentSerializer(data=request.data)
    if serializer.is_valid():
        parent = serializer.save()
        response_data = {
                "isSuccesful": True,
                "message": "Parent profile created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@transaction.atomic
def add_student(request, id):
    data = request.data
    date = data["date_of_birth"].split("T")
    data["date_of_birth"] = date[0]
    # Create parent role if it doesn't exist
    parent_role, created = Role.objects.get_or_create(name="parent")
    # Create user
    parent_data = data.get("parent")
    try:
        user = User.objects.get(username=parent_data["phone_number"])
    except User.DoesNotExist:
        user = User.objects.create_user(
                username= parent_data["phone_number"],
                first_name=parent_data["first_name"],
                last_name=parent_data["last_name"],
                phone_number=parent_data["phone_number"],
                password=parent_data["phone_number"],
                email=parent_data["email"])
        user.roles.set([parent_role])

    parent, created = Parent.objects.get_or_create(user=user)
    parentSerializer = ParentSerializer(parent)
    print(parent.user)
    data["parent"] = parent.user
    # get or create a class
    try:
        _class = Class.objects.get(pk=id)
    except Class.DoesNotExist:
        return Response({"message": "The class does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    class_serializer = ClassSerializer(_class)
    #data["_class"] = class_serializer.data
    data["_class"] = _class.id
    print(data)
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        student = serializer.save()
        print(serializer.data)
        student_details_serializer = StudentDetailSerializer(student)

        return Response({"message": "Student added successfully", "student": student_details_serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response({"message": "Student could not be created", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_students_with_grades(request):
    exam = get_object_or_404(Exam, id=request.GET.get("exam"))
    students = Student.objects.select_related('_class').prefetch_related(
        Prefetch(
            'studentsubjectgrade_set',
            queryset=StudentSubjectGrade.objects.filter(exam=exam).select_related('subject'),
            to_attr='exam_grades'
            )
        )
    data = []
    for student in students:
        subject_score = StudentSubjectGrade.objects.filter(
            student=student,
            exam=exam
            ).values('subject__name', 'score')

        student_data = StudentSerializer(student).data
        student_data["subject_scores"] = subject_score
        if student_data['subject_scores']:
            data.append(student_data)
    return Response({
            'exam_name': exam.name,
            'students': data
        })

@api_view(['GET'])
def get_students(request, class_id, school_id):
    if not class_id:
        students = Student.objects.filter(_class__school=school_id)
    else:
        try:
            _class = Class.objects.get(pk=class_id)
        except Class.DoesNotExist:
            return Response({"message": "The provided class does not exist make sure the class is created first"}, status=status.HTTP_404_NOT_FOUND)

        students = Student.objects.filter(_class=_class)
    serializer = StudentDetailSerializer(students, many=True)
    return Response({"students": serializer.data}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_student_count(request):
    school_id = request.GET.get("school_id")

    try:
        school = School.objects.get(pk=school_id)
    except School.DoesNotExist:
        return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    male_count = Student.objects.filter(_class__school=school, gender='male').count()
    female_count = Student.objects.filter(_class__school=school, gender='female').count()
    student_count = {"male_count": male_count, "female_count": female_count} 
    return Response(student_count, status=status.HTTP_200_OK)
