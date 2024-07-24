from rest_framework import serializers
from .models import Student, Parent
from classes.serializers import ClassSerializer
from classes.models import Class

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = "__all__"

class StudentSerializer(serializers.ModelSerializer):
    _class = ClassSerializer()
    parent = ParentSerializer()

    class Meta:
        model = Student
        fields = "__all__"

    def create(self, validated_data):
        class_data = validated_data.pop("_class")
        parent_data = validated_data.pop("parent")
        parent = Parent.objects.get(**parent_data)
        _class = Class.objects.get(**class_data)
        student = Student.objects.create(_class=_class, parent=parent, **validated_data)
        return student

