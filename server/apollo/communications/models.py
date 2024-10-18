from django.db import models
from users.models import User
from schools.models import School

class Message(models.Model):
    MESSAGE_TYPES = [
        ('reminder', 'Reminder'),
        ('notification', 'Notification'),
        ('alert', 'Alert'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('delivered', 'Delivered'),
        ('failed', 'Failed'),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipients = models.ManyToManyField(User)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='school_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20, choices=MESSAGE_TYPES, default='notification')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"

    class Meta:
        ordering = ['-timestamp']
