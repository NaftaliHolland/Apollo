from django.db import models
from fee.models import AcademicYear, Term
from django.core.validators import MinValueValidator, MaxValueValidator
from students.models import Student
from schools.models import School
from django.utils import timezone

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
    name = models.CharField(max_length=255)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True);
    end_date = models.DateField(null=True, blank=True);
    is_completed = models.BooleanField(default=False)
    is_ongoing= models.BooleanField(default=False)

    def update_is_ongoing(self):
        now = timezone.now().date()
        self.is_ongoing = self.start_date <= now <= self.end_date if self.start_date and self.end_date else False

    def initialize_student_subject_grades(self):
        students = Student.objects.filter(_class__school=self.school)
        student_subject_grades = []
        for student in students:
            subjects = student._class.subjects.all()
            for subject in subjects:
                student_subject_grades.append(
                    StudentSubjectGrade(
                        student=student,
                        exam=self,
                        subject=subject,
                        score=0
                        )
                    )
        StudentSubjectGrade.objects.bulk_create(student_subject_grades)
    def save(self, *args, **kwargs):
        is_new = self._state.adding
        self.update_is_ongoing()
        super().save(*args, **kwargs)

        if is_new:
            self.initialize_student_subject_grades()

    def __str__(self):
        return f"{self.name}"

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
