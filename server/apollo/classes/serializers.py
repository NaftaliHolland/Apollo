from rest_framework import serializers
from .models import Class 
from staff.serializers import TeacherSerializer

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"

class ClassGetSerializer(serializers.ModelSerializer):
    class_teacher = TeacherSerializer(read_only=True)
    class Meta:
        model = Class
        fields = '__all__'
    
