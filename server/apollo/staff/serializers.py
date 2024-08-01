from rest_framework import serializers
from .models import Teacher
from users.serializers import UserSerializer

#class TeacherSerializer(serializers.ModelSerializer):
class TeacherSerializer(UserSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"

    def create(self, validated_data):
        tsc_number = validated_data.pop("tsc_number")
        user = super().create(validated_data)
        setattr(user, "tsc_number", tsc_number)
        return user
