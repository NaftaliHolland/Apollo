from django.db import models
from students.models import Student

class AcademicYear(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-start_date']

class Term(models.Model):
    name = models.CharField(max_length=100)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name="terms")
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=[('upcoming', 'Upcoming'), ('current', 'Current'), ('past', 'Past')])

    def __str__(self):
        return self.name

class FeeCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class TermCategory(models.Model):
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    category = models.ForeignKey(FeeCategory, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.term} {self.category}"

class FeeStructure(models.Model):
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    term_categories = models.ManyToManyField(TermCategory)
    due_date = models.DateField()

    def __str__(self):
        return f"{self.term} {self.category}"

class StudentAccount(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    previous_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    term_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    year_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
	
    def _str__(self):
        return f"{self.student} {self.balance}"

class PeriodAccount(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    period_type = models.CharField(max_length=5, choices=[('year', 'Year'), ('term', 'Term')])
    year = models.ForeignKey(AcademicYear, on_delete=models.SET_NULL, null=True, blank=True)
    term = models.ForeignKey(Term, on_delete=models.SET_NULL, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Period for period {self.year} {self.term} for {self.student}"

class PaymentMethod(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Payment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField()
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.PROTECT)
    student_account = models.ForeignKey(StudentAccount, on_delete=models.CASCADE)
    period_account = models.ForeignKey(PeriodAccount, on_delete=models.CASCADE)

class Discount(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.TextField()

