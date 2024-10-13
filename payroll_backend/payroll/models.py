from django.db import models

class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    position = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Payroll(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_pay = models.DecimalField(max_digits=10, decimal_places=2)

    def calculate_total_pay(self):
        self.total_pay = self.base_salary + self.bonus - self.deductions
        self.save()
