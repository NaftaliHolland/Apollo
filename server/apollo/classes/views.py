from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from students.serializers import StudentSerializer, ParentSerializer
from .serializers import ClassSerializer
from .models import Class
from schools.models import School

class ClassView(APIView):
    def get(self, request, format=None):
        pass

    def post(self, request, id, format=None):

        data = request.data
        try:
            _class = Class.objects.get(name=data["name"], school=id)
            return Response({"message": "Class with similar name already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Class.DoesNotExist:
            pass

        try:
            school = School.objects.get(pk=id)
        except School.DoesNotExist:
            return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        data["school"] = id
        serializer = ClassSerializer(data=data)
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

    def put(self, request, format=None):
        pass

    def delete(self, request, format=None):
        pass


