from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Message
from users.models import User

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipients', 'school', 'content', 'timestamp', 'type', 'status']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        sender = self.context['request'].user
        return Message.objects.create(sender=sender, **validated_data)
