from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'academic_years', AcademicYearViewSet)
router.register(r'terms', TermViewSet)
router.register(r'fee_categories', FeeCategoryViewSet)
router.register(r'term_categories', TermCategoryViewSet)
router.register(r'fee_structures', FeeStructureViewSet)
router.register(r'student_accounts', StudentAccountViewSet)
router.register(r'period_accounts', PeriodAccountViewSet)
router.register(r'payment_methods', PaymentMethodViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'discounts', DiscountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
