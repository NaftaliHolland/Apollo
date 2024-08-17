from django.db import models
from fee.models import AcademicYear, Term
from django.core.validators import MinValueValidator, MaxValueValidator
from students.models import Student

class Subject(models.Model):
    name = models.CharField(max_length=100)

class Grade(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SubjectGrade(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, blank=True, null=True)
    min_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default = 0
        )
    max_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default = 0
        )

    class Meta:
        unique_together = ["subject", "grade"]

    def __str__(self):
        return f"{self.subject.name}--{self.grade.name}"


class Exam(models.Model):
    _name = ''
    term = models.ForeignKey(Term, on_delete=models.CASCADE, default=1)# Remove default

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self):
        self._name = f"{self.term.academic_year.name}/{term.name}"

    def __str__(self):
        return f"{self.term.academic_year.name}--{self.term.name}"

class StudentSubjectGrade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default = 0
        )

    class Meta:
        unique_together = ["student", "exam", "subject"]
    
    def __str__(self):
        return f"{self.student.first_name}--{self.exam.name}--{self.subject.name}--{self.score}"
