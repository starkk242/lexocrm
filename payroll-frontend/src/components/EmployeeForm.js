import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: '',
    position: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/employees/', employee)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Employee
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
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeForm;
