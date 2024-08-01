from django.db import models
from django.conf import settings
from users.models import User

class Teacher(User):
    tsc_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.tsc_number} {self.first_name} {self.last_name}"
