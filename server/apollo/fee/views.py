from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response


class AcademicYearViewSet(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class TermViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Term.objects.all()
    serializer_class = TermSerializer

class FeeCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = FeeCategory.objects.all()
    serializer_class = FeeCategorySerializer

class FeeStructureViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer

class TermCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TermCategory.objects.all()
    serializer_class = TermCategorySerializer 

class StudentAccountViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = StudentAccount.objects.all()
    serializer_class = StudentAccountSerializer

class PaymentMethodViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def create(self, request):
        data = request.data
        # Update the student fee balance
        term_category = data["payment_for"]
        student = data["student"]
        student_fee_balance = StudentFeeBalance.objects.get(student=student, term_category=term_category)
        print(student_fee_balance.balance)
        student_fee_balance.balance -= data["amount_paid"]
        student_fee_balance.save()
        print(student_fee_balance.balance)
        serializer = PaymentSerializer(data=data)
        if serializer.is_valid():
            payment = serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiscountViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
