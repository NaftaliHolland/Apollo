from django.db import transaction
from students.models import Student
from grading.models import Exam, Subject, SubjectGrade, StudentSubjectGrade

def grade_student(student_id, exam_id, subject_marks):
    try:
        student = Student.objects.get(pk=student_id)
        exam = Exam.objects.get(pk=exam_id)
    except (Student.DoesNotExist, Exam.DoesNotExist):
        raise ValueError("Invalid student or exam ID")

    grades = {}

    with transaction.atomic():
        for subject_id, marks in subject_marks.items():
            # Get subject
            try:
                subject = Subject.objects.get(pk=subject_id)
            except Subject.DoesNotExist:
                raise ValueError(f"Invalid subject ID: {subject_id}")

            # Get grade for that subject based on the subject_marks

            subject_grade = SubjectGrade.objects.filter(
                subject=subject,
                min_score__lte=marks,
                max_score__gte=marks
            ).first()
            if subject_grade is None:
                raise ValueError(f"No grade range defined form marks {marks} in subject {subject}")

            # Create or update the StudentSubjectGrade
            student_subject_grade, created = StudentSubjectGrade.objects.update_or_create(
                student=student,
                exam=exam,
                subject=subject,
                defaults={'score': marks}
            )
            grades[subject_id] = subject_grade.grade.name
        return grades
