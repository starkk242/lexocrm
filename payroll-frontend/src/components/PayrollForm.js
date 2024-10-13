import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade,
  Grid,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Edit, Visibility } from '@mui/icons-material';
import axios from 'axios';

function PayrollForm() {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newPayroll, setNewPayroll] = useState({
    employee: '',
    total_pay: '',
    base_salary: '',
    bonus: '',
    deductions: '',
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  // Fetch employees and payrolls from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchPayrolls = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/payrolls/');
        setPayrolls(response.data);
      } catch (error) {
        console.error('Error fetching payrolls:', error);
      }
    };

    fetchEmployees();
    fetchPayrolls();
  }, []);

  const handleOpenEdit = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenEdit(true);
  };

  const handleOpenView = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenView(true);
  };

  const handleOpenAdd = () => {
    setNewPayroll({
      employee: '',
      total_pay: '',
      base_salary: '',
      bonus: '',
      deductions: '',
    });
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenView(false);
    setOpenAdd(false);
    setSelectedPayroll(null);
  };

  const handleUpdate = async () => {
    const data = {
      total_pay: newPayroll.total_pay,
      base_salary: newPayroll.base_salary,
      bonus: newPayroll.bonus,
      deductions: newPayroll.deductions,
    };

    try {
      const response = await axios.patch(`http://localhost:8000/api/payrolls/${selectedPayroll.id}/`, data);
      setPayrolls((prev) => prev.map((p) => (p.id === selectedPayroll.id ? response.data : p)));
      handleClose();
      setSnackMessage('Payroll updated successfully!');
      setSnackOpen(true);
    } catch (error) {
      console.error('Error updating payroll:', error);
      setSnackMessage('Error updating payroll!');
      setSnackOpen(true);
    }
  };

  const handleAddPayroll = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/payrolls/', newPayroll);
      setPayrolls((prev) => [...prev, response.data]);
      handleClose();
      setSnackMessage('Payroll added successfully!');
      setSnackOpen(true);
    } catch (error) {
      console.error('Error adding payroll:', error);
      setSnackMessage('Error adding payroll!');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Existing Payrolls</Typography>
      <Grid container spacing={2}>
        {payrolls.map((payroll) => (
          <Grid item xs={12} md={6} key={payroll.id}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">
                  Employee: {payroll.employee.first_name} {payroll.employee.last_name} <br />
                  Base Salary: {payroll.base_salary} <br />
                  Bonus: {payroll.bonus} <br />
                  Deductions: {payroll.deductions} <br />
                  Total Pay: {payroll.total_pay}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" onClick={() => handleOpenView(payroll)} startIcon={<Visibility />}>
                    View Payslip
                  </Button>
                  <Button variant="outlined" onClick={() => handleOpenEdit(payroll)} startIcon={<Edit />} sx={{ ml: 1 }}>
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleOpenAdd} startIcon={<Add />} sx={{ mt: 2 }}>
        Add New Payroll
      </Button>

      {/* Snackbar for Feedback */}
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>

      {/* Modal for Viewing Payroll as Payslip */}
      <Modal
        open={openView}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openView}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              outline: 'none',
              maxWidth: 600,
              margin: 'auto',
              borderRadius: 2,
              boxShadow: 24,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1300,
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>Payslip</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell align="right">{selectedPayroll?.employee.first_name} {selectedPayroll?.employee.last_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Base Salary</TableCell>
                    <TableCell align="right">{selectedPayroll?.base_salary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bonus</TableCell>
                    <TableCell align="right">{selectedPayroll?.bonus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deductions</TableCell>
                    <TableCell align="right">{selectedPayroll?.deductions}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Total Pay</TableCell>
                    <TableCell align="right" variant="head">{selectedPayroll?.total_pay}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>Close</Button>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for Editing Payroll */}
      <Modal
        open={openEdit}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              outline: 'none',
              maxWidth: 400,
              margin: 'auto',
              borderRadius: 2,
              boxShadow: 24,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1300,
            }}
          >
            <Typography variant="h6">Edit Payroll</Typography>
            <TextField
              label="Base Salary"
              type="number"
              value={newPayroll.base_salary}
              onChange={(e) => setNewPayroll({ ...newPayroll, base_salary: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Bonus"
              type="number"
              value={newPayroll.bonus}
              onChange={(e) => setNewPayroll({ ...newPayroll, bonus: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Deductions"
              type="number"
              value={newPayroll.deductions}
              onChange={(e) => setNewPayroll({ ...newPayroll, deductions: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Total Pay"
              type="number"
              value={newPayroll.total_pay}
              onChange={(e) => setNewPayroll({ ...newPayroll, total_pay: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>Update Payroll</Button>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for Adding New Payroll */}
      <Modal
        open={openAdd}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAdd}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              outline: 'none',
              maxWidth: 400,
              margin: 'auto',
              borderRadius: 2,
              boxShadow: 24,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1300,
            }}
          >
            <Typography variant="h6">Add New Payroll</Typography>
            <TextField
              select
              label="Select Employee"
              value={newPayroll.employee}
              onChange={(e) => setNewPayroll({ ...newPayroll, employee: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </TextField>
            <TextField
              label="Base Salary"
              type="number"
              value={newPayroll.base_salary}
              onChange={(e) => setNewPayroll({ ...newPayroll, base_salary: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Bonus"
              type="number"
              value={newPayroll.bonus}
              onChange={(e) => setNewPayroll({ ...newPayroll, bonus: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Deductions"
              type="number"
              value={newPayroll.deductions}
              onChange={(e) => setNewPayroll({ ...newPayroll, deductions: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Total Pay"
              type="number"
              value={newPayroll.total_pay}
              onChange={(e) => setNewPayroll({ ...newPayroll, total_pay: e.target.value })}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddPayroll}>Add Payroll</Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default PayrollForm;
