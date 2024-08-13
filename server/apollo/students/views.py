from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer, ParentSerializer
from .models import *
from classes.serializers import ClassSerializer
from fee.serializers import StudentAccountSerializer
from fee.models import AcademicYear, TermCategory, FeeStructure, StudentFeeBalance
from schools.models import School

@api_view(['POST'])
def create_parent(request):
    print(request.data)
    serializer = ParentSerializer(data=request.data)
    if serializer.is_valid():
        parent = serializer.save()
        print(parent)
        response_data = {
                "isSuccesful": True,
                "message": "Parent profile created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_student(request, id):
    data = request.data
    print(data)
    date = data["date_of_birth"].split("T")
    data["date_of_birth"] = date[0]
    # Check if parent exists, if not, create parent
    parent, created = Parent.objects.get_or_create(**data["parent"])
    parentSerializer = ParentSerializer(parent)
    data["parent"] = parentSerializer.data
    # get or create a class
    try:
        _class = Class.objects.get(pk=id)
    except Class.DoesNotExist:
        return Response({"message": "The class does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    class_serializer = ClassSerializer(_class)
    data["_class"] = class_serializer.data
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        student = serializer.save()
        # Create student account
        account_serializer = StudentAccountSerializer(data={"student": student.id})
        if account_serializer.is_valid():
            student_account = account_serializer.save()
            print(account_serializer.data)

        # Get feeStructues for the current accademic year for the school
        fee_structure = FeeStructure.objects.get(academic_year__school=student._class.school, academic_year__is_current=True)
        # get term categories in the current fee structure
        term_categories = fee_structure.term_categories.all()
        # For all terms get term_categories
        account_year_balance=0
        account_term_balance=0
        for term_category in term_categories:
            student_fee_balance = StudentFeeBalance(student=student, term_category=term_category)
            if term_category.term.status == "current":
                account_term_balance += term_category.amount
            # For all term_categories create_student_fee_balance objects for the current student
            student_fee_balance.balance = term_category.amount
            # Update the student account
            account_year_balance += term_category.amount
            student_fee_balance.save()
            print(student_fee_balance)
        student_account.year_balance = account_year_balance
        student_account.term_balance = account_term_balance
        student_account.save()
        print(StudentAccountSerializer(student_account).data)

        return Response({"message": "Student added successfully", "student": serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response({"message": "Student could not be created", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
    serializer = StudentSerializer(students, many=True)
    return Response({"students": serializer.data}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_student_count(request):
    school_id = request.GET.get("school_id")

    try:
        school = School.objects.get(pk=school_id)
    except School.DoesNotExist:
        return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    student_count = Student.objects.filter(_class__school=school).count()
    return Response({"student_count": student_count}, status=status.HTTP_200_OK)
