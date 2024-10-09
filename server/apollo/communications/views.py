from rest_framework import viewsets, permissions, status
from .serializers import MessageSerializer
from .models import Message
from rest_framework.response import Response
from .utils import send_message
from students.models import Parent

class MessageViewSet(viewsets.ModelViewSet):
    permission_classses = [permissions.IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request):
        # Create the message object
        school = request.data.get("school")
        content = request.data.get("content")
        recipient_type = request.data.get("recipient_type")

        match recipient_type:
            case "all_parents":
                # get all parents in that school
                # TODO make a prent a user right now we are getting all parents because we still have no direct way of linking a parent to a school
                recipients = Parent.objects.filter(student___class__school=school).values_list("id", flat=True)
            case "class_parents":
                class_id = request.data.get("class")
                students = Students.objects.filter(_class=class_id)
                recipients = Parents.objects.filter(student___class=class_id).distinct()
            case "individual":
                user_id = request.data.get("user")
                user = User.objects.get(pk=user_id)
                recipients = user
            case "all_staff":
                # Get all staff
                # Update the recipients variable
                pass
            case "teachers":
                # Get all teachers
                # Update the recipients variable
                pass
            case _:
                pass

        serializer = self.get_serializer(data={
            "sender": request.user,
            "school": request.data.get("school"),
            "recipients": recipients,
            "content": request.data.get("content"),
            "type": request.data.get("type")
            })
        serializer.is_valid()
        print(serializer.errors)
        print(serializer.data, "Here")
        self.perform_create(serializer)
        send_message(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    def list(self, request):
        school = request.GET.get("school")
        queryset = Message.objects.filter(school=school)
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)
