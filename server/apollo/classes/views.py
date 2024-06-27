from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from students.serializers import StudentSerializer, ParentSerializer

@api_view(['POST'])
def create_class(request):
    print(request.data)
    # Get teacher with id 
    teacher_id = request.data.get("class_teacher_id")
    try:
        teacher = Teacher.objects.get(pk=teacher_id)
    except Teacher.DoesNotExist:
        return Response({"error": "Teacher with the  provided id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ClassSerializer(data=request.data)
    if serializer.is_valid():
        class_ = serializer.save()
        print(class_)
        response_data = {
                "isSuccesful": True,
                "message": "Class created successfully",
                }
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

