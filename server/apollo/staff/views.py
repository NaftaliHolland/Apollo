from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import RoleSerializer, StaffSerializer, TeacherSerializer
from .models import *

@api_view(['POST'])
def create_role(request):
    print(request.data)
    serializer = RoleSerializer(data=request.data)
    if serializer.is_valid():
        role = serializer.save()
        print(role.id, role)
        response_data = {
                "isSuccesful": True,
                "message": "Role created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_staff(request):
    print(request.data)
    role_id = request.data.get("role")
    try:
        role = Role.objects.get(pk=role_id)
    except Role.DoesNotExist:
        return Response({"error": "Role with the  provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = StaffSerializer(data=request.data)
    if serializer.is_valid():
        staff = serializer.save()
        print(staff.id, staff)
        response_data = {
                "isSuccesful": True,
                "message": "Staff created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_teacher(request):
    data = request.data
    try:
        teacher = Teacher.objects.get(tsc_number=data["tsc_number"])
        return Response({"message": "Teacher with the provided tsc number already exists"}, status=status.HTTP_400_BAD_REQUEST)
    except Teacher.DoesNotExist:
        pass
    role_name = data["role"]
    try:
        role = Role.objects.get(name=role_name)
    except Role.DoesNotExist:
        role_serializer = RoleSerializer(data={"name": role_name})
        if role_serializer.is_valid():
            role = role_serializer.save()

    data["role"] = [role.id]
    serializer = TeacherSerializer(data=data)
    if serializer.is_valid():
        teacher = serializer.save()
        print(teacher)
        return Response({"message": "Teacher added successfully", "teacher": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"message": "Error creating teacher", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
