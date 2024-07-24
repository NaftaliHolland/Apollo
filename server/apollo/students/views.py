from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer, ParentSerializer
from .models import *
from classes.serializers import ClassSerializer

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
def add_student(request):
    data = request.data
    date = data["date_of_birth"].split("T")
    data["date_of_birth"] = date[0]
    # Check if parent exists, if not, create parent
    parent, created = Parent.objects.get_or_create(**data["parent"])
    parentSerializer = ParentSerializer(parent)
    data["parent"] = parentSerializer.data
    # get or create a class
    _class, created = Class.objects.get_or_create(name=data["_class"])

    class_serializer = ClassSerializer(_class)
    data["_class"] = class_serializer.data
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        student = serializer.save()
        return Response({"message": "Student added successfully", "student": serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response({"message": "Student could not be created", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_students(request, _class):
    if _class == "all":
        students = Student.objects.all()
    else:
        try:
            _class = Class.objects.get(name=_class)
        except Class.DoesNotExist:
            return Response({"message": "The provided class does not exist make sure the class is created first"}, status=status.HTTP_404_NOT_FOUND)

        students = Student.objects.filter(_class=_class)
    serializer = StudentSerializer(students, many=True)
    return Response({"students": serializer.data}, status=status.HTTP_200_OK)
    
