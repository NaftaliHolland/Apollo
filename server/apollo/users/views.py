from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer 
from .models import *

def get_user_tokens(user):
   refresh = RefreshToken.for_user(user)
   return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    } 

@api_view(['POST'])
def signup(request):
    data = request.data
    try:
        user = User.objects.get(username=data["username"])
        return Response({"message": "User with the provided username exists"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_user_tokens(user)
            return Response({"message": "User created successfully", "user": serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    print(request.data)
    username = request.data.get("username")
    password = request.data.get("password")

    print(User.objects.get(username=username))
    
    user = authenticate(username=username, password=password)
    print(user)
    if user is not None:
        user_serializer = UserSerializer(user)
        tokens = get_user_tokens(user)

        return Response({"user": user_serializer.data, "tokens": tokens}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)  
