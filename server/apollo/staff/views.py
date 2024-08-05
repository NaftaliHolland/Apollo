from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeacherSerializer
from .models import *
from users.models import Role
from users.serializers import RoleSerializer, UserSerializer
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

class TeachersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id, format=None):
        # Get school
        try:
            school = School.objects.get(pk=id)
            print(school)
            print(school.id)
        except School.DoesNotExist:
            return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        #teachers = Teacher.objects.filter(school=school)
        teachers = Teacher.objects.filter(user__school=school)
        serializer = TeacherSerializer(teachers, many=True)
        print(teachers)
        return Response({"teachers": serializer.data}, status=status.HTTP_200_OK)

    def post(serlf, request, format=None):
        pass

    def put(self, request, format=None):
        pass
    
    def delete(self, request, format=None):
        pass

class TeacherView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        pass

    def post(serlf, request, format=None):
        data = request.data
        try:
            teacher = Teacher.objects.get(tsc_number=data["tsc_number"], user__username=data["phone_number"])
            return Response({"message": "Teacher with the provided tsc number already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Teacher.DoesNotExist:
            pass

        # Create user
        role, created = Role.objects.get_or_create(name="teacher")
        role_serializer = RoleSerializer(role)
        school = School.objects.get(pk=data["school"])
        school_serializer = SchoolSerializer(school)
        data["school"] = school_serializer.data
        data["roles"] = [role_serializer.data]
        data["username"] = data["phone_number"]
        data["password"] = data["phone_number"]
        tsc_number = data.pop("tsc_number")
        teacher_data = {"user": data, "tsc_number": tsc_number}
        teacher_serializer = TeacherSerializer(data=teacher_data)
        if teacher_serializer.is_valid():
            teacher = teacher_serializer.save()
            return Response({"message": "Teacher added successfully", "teacher": teacher_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(teacher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        pass
    
    def delete(self, request, format=None):
        pass

