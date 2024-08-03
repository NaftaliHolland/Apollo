from django.shortcuts import render
from .serializers import SchoolSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from users.models import Role, User
from users.serializers import RoleSerializer, UserSerializer
from schools.serializers import SchoolSerializer
from users.views import get_user_tokens

# Create your views here.

@api_view(['POST'])
def register_school(request):
    print(request.data)
    # Create School
    school_serializer = SchoolSerializer(data=request.data.get("school"))
    if school_serializer.is_valid():
        school = school_serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Create admin user
    user_data = request.data.get("admin")
    user_data["school"] = school_serializer.data
    role, created = Role.objects.get_or_create(name="admin")
    role_serializer = RoleSerializer(role)
    user_data["roles"] = [role_serializer.data]
    user_data["username"] = user_data["phone_number"]
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        tokens = get_user_tokens(user)
        return Response({"message": "School account created succesfully created successfully", "user": user_serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
    return Response({"message": "Could not create school", "errors": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


