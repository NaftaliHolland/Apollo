from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    phone_number = models.CharField(max_length = 20, blank=True)
    email = models.EmailField()

    #USERNAME_FIELD = 'id'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
