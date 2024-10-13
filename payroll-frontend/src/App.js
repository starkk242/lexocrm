import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmployeeForm from './components/EmployeeForm';
import PayrollForm from './components/PayrollForm';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/employees">
          <ListItemText primary="Employee Page" />
        </ListItem>
        <ListItem button component={Link} to="/payroll">
          <ListItemText primary="Payroll Page" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Payroll Management System
          </Typography>
          <Button color="inherit" component={Link} to="/employees">
            Employee Page
          </Button>
          <Button color="inherit" component={Link} to="/payroll">
            Payroll Page
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/employees" element={<EmployeeForm />} />
          <Route path="/payroll" element={<PayrollForm />} />
          <Route
            path="/"
            element={
              <Typography variant="h4" align="center">
                Welcome to the Payroll Management System
              </Typography>
            }
          />
          <Route
            path="*"
            element={
              <Typography variant="h4" align="center">
                404 Not Found
              </Typography>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
