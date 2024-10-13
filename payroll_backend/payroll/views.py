from rest_framework import generics
from .models import Employee, Payroll
from .serializers import EmployeeSerializer, PayrollSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class PayrollListCreateView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer

class PayrollDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer


@api_view(['GET'])
def employee_list(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)