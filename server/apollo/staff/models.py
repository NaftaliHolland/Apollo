from django.db import models
from django.conf import settings
from users.models import User

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile")
    tsc_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.tsc_number} {self.user.first_name} {self.user.last_name}"
