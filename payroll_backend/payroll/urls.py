from django.urls import path
from .views import EmployeeListCreateView, PayrollListCreateView, PayrollDetailUpdateView, EmployeeDetailUpdateView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list'),
    path('employees/<int:pk>/', EmployeeDetailUpdateView.as_view(), name='employee-detail'),
    path('payrolls/', PayrollListCreateView.as_view(), name='payroll-list'),
    path('payrolls/<int:pk>/', PayrollDetailUpdateView.as_view(), name='payroll-detail'),
]
