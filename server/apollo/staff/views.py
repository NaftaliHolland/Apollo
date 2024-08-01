from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import TeacherSerializer
from .models import *
from users.models import Role
from users.serializers import RoleSerializer
from schools.serializers import SchoolSerializer
from schools.models import School

@api_view(['POST'])
def add_teacher(request):
    data = request.data
    try:
        teacher = Teacher.objects.get(tsc_number=data["tsc_number"])
        return Response({"message": "Teacher with the provided tsc number already exists"}, status=status.HTTP_400_BAD_REQUEST)
    except Teacher.DoesNotExist:
        pass

    school = School.objects.get(pk=data["school"])
    school_serializer = SchoolSerializer(school)
    data["school"] = school_serializer.data
    role, created = Role.objects.get_or_create(name=data["role"])
    role_serializer = RoleSerializer(role)
    data["roles"] = [role_serializer.data]
    data["password"] = "teacher"
    data["username"] = f"{data['first_name']}{data['last_name']}"

    serializer = TeacherSerializer(data=data)
    if serializer.is_valid():
        teacher = serializer.save()
        return Response({"message": "Teacher added successfully", "teacher": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"message": "Error creating teacher", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_teachers(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response({"teachers": serializer.data}, status=status.HTTP_200_OK)
