from rest_framework import viewsets, permissions, status
from .serializers import MessageSerializer
from .models import Message
from rest_framework.response import Response
from .utils import send_message

class MessageViewSet(viewsets.ModelViewSet):
    permission_classses = [permissions.IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request):
        # Create the message object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # send the message
        send_message(serializer.data)
        # Return response, sucess/failure
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    def list(self, request):
        school = request.GET.get("school")
        queryset = Message.objects.filter(school=school)
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)
