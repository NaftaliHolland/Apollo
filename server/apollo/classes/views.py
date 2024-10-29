from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from students.serializers import StudentSerializer, ParentSerializer
from .serializers import ClassSerializer, ClassGetSerializer
from .models import Class
from schools.models import School

class ClassDetailView(APIView):
    def get(self, request, id, format=None):
        class_id = id
        try:
            query_set = Class.objects.get(pk=class_id)
        except Class.DoesNotExist:
            return Response({"message": "Class with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ClassGetSerializer(query_set)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, id, format=None):
        class_id = id
        try:
            class_instance = Class.objects.get(pk=class_id)
            class_instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(serf, request, id, format=None):
        class_id = id
        try:
            class_instance = Class.objects.get(pk=class_id)
            serializer = ClassSerializer(class_instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

class ClassView(APIView):
    def get(self, request, format=None):
        school_id = request.GET.get("school")
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        classes = Class.objects.filter(school=school)
        if (request.GET.get("count")):
            class_count = Class.objects.filter(school=school).count()
            return Response(class_count)

        classes = Class.objects.filter(school=school)
        serializer = ClassGetSerializer(classes, many=True)
        return Response({"classes": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        data = request.data
        school_id = request.GET.get("school")
        try:
            _class = Class.objects.get(name=data["name"], school=school_id)
            return Response({"message": "Class with similar name already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Class.DoesNotExist:
            pass
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({"message": "School with the provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        data["school"] = school_id
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
    def patch(self, request, format=None):
        print(request.data)
        pass
