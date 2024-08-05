from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import authentication
from rest_framework.views import APIView
from apollo.serializers import CustomObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, RoleSerializer
from .models import *
from schools.models import School
from schools.serializers import SchoolSerializer

def get_user_tokens(user):
   #refresh = RefreshToken.for_user(user)
   refresh = CustomObtainPairSerializer.get_token(user)
   access = refresh.access_token
   return {
        'refresh': str(refresh),
        'access': str(access),
    } 

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def signup(request):
    data = request.data
    try:
        user = User.objects.get(username=data["phone_number"])
        return Response({"message": "User with the provided number exists"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        # remove these later
        data["school"] = 1
        role, created = Role.objects.get_or_create(name=data["role"])
        role_serializer = RoleSerializer(role)
        school = School.objects.get(pk=data["school"])
        school_serializer = SchoolSerializer(school)
        data["school"] = school_serializer.data
        data["roles"] = [role_serializer.data]
        data["username"] = data["phone_number"]
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_user_tokens(user)
            return Response({"message": "User created successfully", "user": serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    
    user = authenticate(username=username, password=password)
    if user is not None:
        user_serializer = UserSerializer(user)
        tokens = get_user_tokens(user)
        #tokens = RefreshToken.for_user(user)
        print(type(tokens))
        print(tokens["refresh"])
        print(tokens["access"])
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

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        token = request.headers["Authorization"].split(' ')[1]
        user_serializer = UserSerializer(request.user)
        return Response({"message": "Hello there get user", "user": user_serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        pass

    def delete(self, request, format=None):
        pass
