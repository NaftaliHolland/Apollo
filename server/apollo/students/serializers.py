from rest_framework import serializers
from .models import Student, Parent
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
        fields = ["first_name", "last_name"]
    
class ParentDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Parent
        fields = ["user"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class StudentDetailSerializer(serializers.ModelSerializer):
    _class = ClassSerializer()
    parent = ParentDetailSerializer()
    
    class Meta:
        model = Student
        fields = "__all__"

'''class StudentSerializer(serializers.ModelSerializer):
    _class = ClassSerializer()
    parent = ParentSerializer()

    class Meta:
        model = Student
        fields = "__all__"

    def create(self, validated_data):
        print("create was called")
        class_data = validated_data.pop("_class")
        print(class_data, "Here")
        parent_data = validated_data.pop("parent")
        parent = Parent.objects.get(**parent_data)
        _class = Class.objects.get(
            name=class_data["name"],
            school=class_data["school"].id)
        student = Student.objects.create(_class=_class, parent=parent, **validated_data)
        return student
'''
