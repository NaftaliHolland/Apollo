from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from apollo.serializers import CustomObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, RoleSerializer
from .models import *
from schools.models import School
from schools.serializers import SchoolSerializer

def get_user_tokens(user):
   refresh = RefreshToken.for_user(user)
   access = CustomObtainPairSerializer.get_token(user)
   return {
        'refresh': str(refresh),
        'access': str(access),
    } 

@api_view(['POST'])
def signup(request):
    data = request.data
    try:
        user = User.objects.get(username=data["username"])
        return Response({"message": "User with the provided username exists"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        # remove these later
        data["school"] = 1
        role, created = Role.objects.get_or_create(name=data["role"])
        role_serializer = RoleSerializer(role)
        school = School.objects.get(pk=data["school"])
        school_serializer = SchoolSerializer(school)
        data["school"] = school_serializer.data
        data["roles"] = [role_serializer.data]
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_user_tokens(user)
            return Response({"message": "User created successfully", "user": serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    
    user = authenticate(username=username, password=password)
    if user is not None:
        user_serializer = UserSerializer(user)
        tokens = get_user_tokens(user)

        return Response({"user": user_serializer.data, "tokens": tokens}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['POST'])
def create_role(request):
    serializer = RoleSerializer(data=request.data)
    if serializer.is_valid():
        role = serializer.save()
        response_data = {
                "isSuccesful": True,
                "message": "Role created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)
