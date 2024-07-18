from django.db import models
from django.conf import settings

class Role(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Staff(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=50)
    role = models.ManyToManyField(Role)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Teacher(Staff):
    tsc_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.tsc_number} {self.first_name} {self.last_name}"
