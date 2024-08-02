from django.shortcuts import render
from .serializers import SchoolSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

@api_view(['POST'])
def register_school(request):
    print(request.data)
    serializer = SchoolSerializer(data=request.data)
    if serializer.is_valid():
        school = serializer.save()

        return Response({"message": "School created successfully", "school": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


