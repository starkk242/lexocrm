from django.urls import path
from .views import EmployeeListCreateView, PayrollListCreateView, PayrollDetailUpdateView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list'),
    path('payrolls/', PayrollListCreateView.as_view(), name='payroll-list'),
    path('payrolls/<int:pk>/', PayrollDetailUpdateView.as_view(), name='payroll-detail'),
]
