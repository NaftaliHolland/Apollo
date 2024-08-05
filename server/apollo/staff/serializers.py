from rest_framework import serializers
from .models import Teacher
from users.serializers import UserSerializer
from users.models import User

#class TeacherSerializer(serializers.ModelSerializer):
class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Teacher
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
        teacher = Teacher.objects.create(user=user, **validated_data)
        return teacher

