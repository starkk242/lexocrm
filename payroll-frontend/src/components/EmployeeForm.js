import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    salary: '',
    position: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:8000/api/employees/')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.id) {
      // Update existing employee
      axios.put(`http://localhost:8000/api/employees/${employee.id}/`, employee)
        .then(response => {
          fetchEmployees();
          resetForm();
        })
        .catch(error => console.error('Error updating employee:', error));
    } else {
      // Create new employee
      axios.post('http://localhost:8000/api/employees/', employee)
        .then(response => {
          fetchEmployees();
          resetForm();
        })
        .catch(error => console.error('Error adding employee:', error));
    }
  };

  const resetForm = () => {
    setEmployee({ id: null, first_name: '', last_name: '', email: '', salary: '', position: '' });
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/employees/${id}/`)
      .then(() => fetchEmployees())
      .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {employee.id ? 'Edit Employee' : 'Add Employee'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={employee.first_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={employee.last_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={employee.position}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Salary"
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {employee.id ? 'Update Employee' : 'Add Employee'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Employee List
      </Typography>
      <List>
        {employees.map(emp => (
          <ListItem key={emp.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEdit(emp)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(emp.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={`${emp.first_name} ${emp.last_name}`} secondary={`Email: ${emp.email}, Position: ${emp.position}, Salary: ${emp.salary}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmployeeForm;
