from django.db import models
from fee.models import AcademicYear, Term
from django.core.validators import MinValueValidator, MaxValueValidator
from students.models import Student
from schools.models import School

class Subject(models.Model):
    name = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    code = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self._state.adding:
            super().save(*args, **kwargs)
            grades = Grade.objects.filter(school=self.school)
            for grade in grades:
                SubjectGrade.objects.create(subject=self, grade=grade, min_score=0, max_score=0)

    def __str__(self):
        return self.name

class Grade(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, null=True, blank=True)
    comments = models.CharField(max_length=200, null=True, blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self._state.adding:
            super().save(*args, **kwargs)
            subjects = Subject.objects.filter(school=self.school)
            for subject in subjects:
                SubjectGrade.objects.create(subject=subject, grade=self, min_score=0, max_score=0)

    def __str__(self):
        return f"{self.name} {self.school.name}"

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
    start_date = models.DateField(null=True, blank=True);
    end_date = models.DateField(null=True, blank=True);
    done = models.BooleanField(default=False)
    ongoing = models.BooleanField(default=False)

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
