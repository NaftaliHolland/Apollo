from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date

class User(AbstractUser):

    ROLES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('parent', 'Parent'),
        ('staff', 'Staff'),
        ('student', 'Student'),
    )

    username = models.CharField(max_length = 50, unique = True)
    email = models.EmailField(blank = True, null = True)
    phone_number = models.CharField(max_length = 20)
    role = models.CharField(max_length=20, choices=ROLES, default='admin')
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password', 'phone_number']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
