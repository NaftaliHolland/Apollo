from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer, ParentSerializer

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
