from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'terms', TermViewSet, basename='term')
router.register(r'fee_categories', FeeCategoryViewSet, basename='fee_category')
router.register(r'fee_amount', FeeAmountViewSet, basename='fee_amount')

urlpatterns = router.urls
