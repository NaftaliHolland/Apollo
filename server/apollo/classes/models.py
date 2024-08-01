from django.db import models
from staff.models import Teacher

class Class(models.Model):
    name = models.CharField(max_length=50)
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE)
    class_teacher = models.ForeignKey(Teacher, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.name} {self.class_teacher}"

class Subject(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    teacher = models.ManyToManyField(Teacher)

    def __str__(self):
        return self.name
