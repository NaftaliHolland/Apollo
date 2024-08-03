from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from users.serializers import UserSerializer 

class CustomObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        serialized_user = UserSerializer(user)
        token['roles'] = serialized_user.data["roles"]

        return token
