from rest_framework import serializers
from .models import Term, FeeCategory, FeeAmount

class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = ['id', 'name', 'school', 'start_date', 'end_date', 'status']
        read_only_fields = ['id']

class FeeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeCategory
        fields = ['id', 'name', 'school', 'description']
        read_only_fields = ['id']

class FeeAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeAmount
        fields = ['id', 'term', 'Class', 'fee_category', 'amount']
        read_only_fields = ['id']
