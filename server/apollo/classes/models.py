from django.db import models
from staff.models import Teacher

class Class(models.Model):
    name = models.CharField(max_length=50)
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE)
    class_teacher = models.ForeignKey(Teacher, null=True, blank=True, on_delete=models.SET_NULL)
    subjects = models.ManyToManyField('grading.Subject', related_name='classes', blank=True)

    def __str__(self):
        return f"{self.name} {self.school.name}"
