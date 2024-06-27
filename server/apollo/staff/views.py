from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import RoleSerializer, StaffSerializer
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
def create_teacher(
