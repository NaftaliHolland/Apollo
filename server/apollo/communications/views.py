from rest_framework import viewsets, permissions, status
from .serializers import MessageSerializer
from .models import Message
from rest_framework.response import Response
from .utils import send_message
from students.models import Parent
from users.models import User

class MessageViewSet(viewsets.ModelViewSet):
    permission_classses = [permissions.IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request):
        # Create the message object
        school = request.data.get("school")
        content = request.data.get("content")
        classes = request.data.get("classes")

        recipients = User.objects.filter(
                parent__children___class__id__in=classes
            ).distinct().values_list('id', flat=True)
        print(recipients)

        serializer = self.get_serializer(data={
            "sender": request.user.id,
            "school": school,
            "recipients": recipients,
            "content": content,
            "type": request.data.get("type")
            })
        serializer.is_valid()
        print(serializer.errors)
        self.perform_create(serializer)
        print(serializer.data, "Here")
        send_message(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    def list(self, request):
        school = request.GET.get("school")
        queryset = Message.objects.filter(school=school)
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)
