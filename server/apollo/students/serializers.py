from rest_framework import serializers
from .models import Student, Parent, StudentGroup
from classes.serializers import ClassSerializer
from classes.models import Class
from users.serializers import UserSerializer
from users.models import User

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = "__all__"

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "phone_number"]
    
class ParentDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Parent
        fields = ["user"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ["admission_number"]

class StudentDetailSerializer(serializers.ModelSerializer):
    _class = ClassSerializer()
    parent = ParentDetailSerializer()
    
    class Meta:
        model = Student
        fields = "__all__"

class StudentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroup
        fields = "__all__"
