from django.db import models
from students.models import Student

class Term(models.Model):
    choices = [
            ('upcoming', 'Upcoming'),
            ('current', 'Current'),
            ('past', 'Past')
        ]

    name = models.CharField(max_length=100)
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="academic_years")
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=choices)

    def __str__(self):
        return self.name

class FeeCategory(models.Model):
    name = models.CharField(max_length=100)
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="schools")
    description = models.TextField()

    def __str__(self):
        return self.name

class FeeAmount(models.Model):
    term = models.ForeignKey("fee.Term", on_delete=models.CASCADE, related_name="terms")
    Class = models.ForeignKey("classes.Class", on_delete=models.CASCADE, related_name="classes")
    fee_category = models.ForeignKey("fee.FeeCategory", on_delete=models.CASCADE, related_name="fee_categories")
    amount = models.FloatField(default=0.0)
