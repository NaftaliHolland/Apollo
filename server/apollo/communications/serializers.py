from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Message
from users.models import User

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipients', 'school', 'content', 'timestamp', 'type', 'status']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        recipients = validated_data.pop('recipients')
        message = Message.objects.create(**validated_data)
        message.recipients.set(recipients)

        return message
