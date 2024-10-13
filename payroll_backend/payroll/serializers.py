from rest_framework import serializers
from .models import Employee, Payroll

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class PayrollSerializer(serializers.ModelSerializer):

    employee = EmployeeSerializer()
    
    class Meta:
        model = Payroll
        fields = '__all__'
