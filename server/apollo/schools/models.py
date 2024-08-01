from django.db import models

class School(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20)
    county = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.CharField(max_length=250, blank=True, null=True)
    established_date = models.DateField(blank=True, null=True)
    type = models.CharField(max_length=100)
    logo = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    affiliation = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name
