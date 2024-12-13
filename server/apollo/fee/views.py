from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from schools.models import School

class TermViewSet(viewsets.ModelViewSet):
    serializer_class = TermSerializer

    def get_queryset(self):
        queryset = Term.objects.all()
        status = self.request.query_params.get('status', None)
        school_id = self.request.query_params.get('school', None)
        
        if status:
            queryset = queryset.filter(status=status)
        if school_id:
            queryset = queryset.filter(school_id=school_id)
        
        return queryset

class FeeCategoryViewSet(viewsets.ModelViewSet):
    queryset = FeeCategory.objects.all()
    serializer_class = FeeCategorySerializer

    def get_queryset(self):
        school_id = self.request.query_params.get('school', None)
        if school_id:
            return FeeCategory.objects.filter(school_id=school_id)
        return FeeCategory.objects.none()

class FeeAmountViewSet(viewsets.ModelViewSet):
    serializer_class = FeeAmountSerializer

    def get_queryset(self):
        school_id = self.request.query_params.get('school', None)
        if school_id:
            return FeeAmount.objects.filter(Class__school=school_id)
        return FeeAmount.objects.none()
