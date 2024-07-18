from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create_user(
                first_name = validated_data["first_name"],
                last_name = validated_data["last_name"],
                username = validated_data["username"],
                email = validated_data.get("email"),
                phone_number = validated_data["phone_number"],
                password = validated_data["password"]
                )
        user.is_superuser = True
        user.is_staff = True
        return user

