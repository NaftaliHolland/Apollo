from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from students.serializers import StudentSerializer, ParentSerializer
from .serializers import ClassSerializer

@api_view(['POST'])
def create_class(request):
    print(request.data)
    serializer = ClassSerializer(data=request.data)
    if serializer.is_valid():
        _class = serializer.save()
        print(_class)
        response_data = {
                "isSuccesful": True,
                "message": "Class created successfully",
                "class": serializer.data,
                }
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

