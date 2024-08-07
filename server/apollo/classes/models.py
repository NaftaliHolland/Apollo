from django.db import models
from staff.models import Teacher

class Class(models.Model):
    name = models.CharField(max_length=50)
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE)
    class_teacher = models.ForeignKey(Teacher, null=True, blank=True, on_delete=models.SET_NULL)
    fee_structure = models.ForeignKey("fee.FeeStructure", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.name} {self.school.name}"
