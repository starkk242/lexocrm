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

const styles = {
  appBar: {
    backgroundColor: '#2c3e50',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    flexDirection: 'column',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#34495e',
  },
  card: {
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#e8f6f3', // Light teal color
    textDecoration: 'none',
    margin: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#34495e',
  },
};

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
      <AppBar position="static" sx={styles.appBar}>
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
            LexoCRM
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      <Container sx={styles.container}>
        {/* Conditional rendering for the welcome message */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Typography sx={styles.header}>Welcome to the LexoCRM - Payroll Managment</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Link to="/employees" style={{ textDecoration: 'none' }}>
                    <Box
                      sx={styles.card}
                      className="card"
                    >
                      <Typography sx={styles.typography}>Employee Page</Typography>
                    </Box>
                  </Link>
                  <Link to="/payroll" style={{ textDecoration: 'none' }}>
                    <Box
                      sx={styles.card}
                      className="card"
                    >
                      <Typography sx={styles.typography}>Payroll Page</Typography>
                    </Box>
                  </Link>
                </Box>
              </>
            }
          />
          <Route path="/employees" element={<EmployeeForm />} />
          <Route path="/payroll" element={<PayrollForm />} />
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
