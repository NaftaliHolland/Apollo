from django.db import models
from classes.models import Class
from django.conf import settings

class Parent(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    #user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Student(models.Model):
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10)
    profile_photo = models.CharField(max_length=250, null=True, blank=True)
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    _class = models.ForeignKey(Class, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def _str__(self):
        return self.first_name
