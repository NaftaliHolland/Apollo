from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Message
from users.models import User

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'school', 'content', 'timestamp', 'type', 'status']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        sender = self.context['request'].user
        receiver_id = self.context['request'].data.get('receiver_id')
        receiver = User.objects.get(id=receiver_id)
        return Message.objects.create(sender=sender, receiver=receiver, **validated_data)
