from rest_framework import serializers
from .models import User, Role
from schools.serializers import SchoolSerializer
from schools.models import School

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True)
    school = SchoolSerializer()
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        roles_data = validated_data.pop("roles")
        school_data = validated_data.pop("school")
        school = School.objects.get(**school_data)
        print(validated_data)
        user = User.objects.create_user(**validated_data, school=school)
        for  role_data in roles_data:
            role = Role.objects.get(**role_data)
            user.roles.add(role)
        user.is_superuser = True
        user.is_staff = True
        return user

