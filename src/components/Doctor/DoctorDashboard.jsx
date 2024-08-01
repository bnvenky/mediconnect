/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Snackbar, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState('');
  const [advice, setAdvice] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      console.log('Loaded Appointments:', storedAppointments); // Debugging
      setAppointments(storedAppointments);
      setAvailability(JSON.parse(localStorage.getItem('availability')) || '');
      setAdvice(JSON.parse(localStorage.getItem('advice')) || '');
    } catch (error) {
      console.error('Error loading data from localStorage', error);
    }
  }, []);

  const handleEdit = (index) => {
    const appointmentToEdit = appointments[index];
    setEditIndex(index);
    setEditedDate(appointmentToEdit.date || '');
    setEditedTime(appointmentToEdit.time || '');
  };

  const handleUpdate = () => {
    if (!editedDate || !editedTime) {
      setSnackbarMessage('Please provide both date and time.');
      setSnackbarOpen(true);
      return;
    }

    const updatedAppointments = appointments.map((appointment, index) => 
      index === editIndex
        ? { ...appointment, date: editedDate, time: editedTime }
        : appointment
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setEditIndex(null);
    setEditedDate('');
    setEditedTime('');
    setSnackbarMessage('Appointment updated successfully');
    setSnackbarOpen(true);
  };

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setSnackbarMessage('Appointment deleted successfully');
    setSnackbarOpen(true);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handleSaveAvailability = () => {
    localStorage.setItem('availability', availability);
    setSnackbarMessage('Availability updated successfully');
    setSnackbarOpen(true);
  };

  const handleAdviceChange = (event) => {
    setAdvice(event.target.value);
  };

  const handleSaveAdvice = () => {
    localStorage.setItem('advice', JSON.stringify(advice));
    setSnackbarMessage('Advice saved successfully');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Set Your Availability</Typography>
        <TextField
          label="Availability"
          multiline
          fullWidth
          margin="normal"
          value={availability}
          onChange={handleAvailabilityChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAvailability}
          sx={{ mt: 2 }}
        >
          Save Availability
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Give Advice to Patients</Typography>
        <TextField
          label="Advice"
          multiline
          fullWidth
          margin="normal"
          value={advice}
          onChange={handleAdviceChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAdvice}
          sx={{ mt: 2 }}
        >
          Save Advice
        </Button>
      </Box>

      {editIndex !== null && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Edit Appointment</Typography>
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 2 }}
          >
            Update Appointment
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Patient Appointments</Typography>
        <List>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <ListItem 
                key={index} 
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`Patient: ${appointment.patient || 'No name provided'}`}
                  secondary={`Date: ${appointment.date || 'No date provided'}, Time: ${appointment.time || 'No time provided'}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No appointments found.</Typography>
          )}
        </List>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default DoctorDashboard;



{/*import React, { useState, useEffect } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Snackbar, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState('');
  const [advice, setAdvice] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const storedAvailability = JSON.parse(localStorage.getItem('availability')) || '';
      const storedAdvice = JSON.parse(localStorage.getItem('advice')) || '';
      
      console.log('Loaded Appointments:', storedAppointments); // Debugging
      console.log('Loaded Availability:', storedAvailability); // Debugging
      console.log('Loaded Advice:', storedAdvice); // Debugging

      setAppointments(storedAppointments);
      setAvailability(storedAvailability);
      setAdvice(storedAdvice);
    } catch (error) {
      console.error('Error loading data from localStorage', error);
      // Optionally, clear localStorage or provide a fallback
    }
  }, []);

  const handleEdit = (index) => {
    const appointmentToEdit = appointments[index];
    setEditIndex(index);
    setEditedDate(appointmentToEdit.date || '');
    setEditedTime(appointmentToEdit.time || '');
  };

  const handleUpdate = () => {
    if (!editedDate || !editedTime) {
      setSnackbarMessage('Please provide both date and time.');
      setSnackbarOpen(true);
      return;
    }

    const updatedAppointments = appointments.map((appointment, index) => 
      index === editIndex
        ? { ...appointment, date: editedDate, time: editedTime }
        : appointment
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setEditIndex(null);
    setEditedDate('');
    setEditedTime('');
    setSnackbarMessage('Appointment updated successfully');
    setSnackbarOpen(true);
  };

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setSnackbarMessage('Appointment deleted successfully');
    setSnackbarOpen(true);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handleSaveAvailability = () => {
    localStorage.setItem('availability', JSON.stringify(availability));
    setSnackbarMessage('Availability updated successfully');
    setSnackbarOpen(true);
  };

  const handleAdviceChange = (event) => {
    setAdvice(event.target.value);
  };

  const handleSaveAdvice = () => {
    localStorage.setItem('advice', JSON.stringify(advice));
    setSnackbarMessage('Advice saved successfully');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Set Your Availability</Typography>
        <TextField
          label="Availability"
          multiline
          fullWidth
          margin="normal"
          value={availability}
          onChange={handleAvailabilityChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAvailability}
          sx={{ mt: 2 }}
        >
          Save Availability
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Give Advice to Patients</Typography>
        <TextField
          label="Advice"
          multiline
          fullWidth
          margin="normal"
          value={advice}
          onChange={handleAdviceChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAdvice}
          sx={{ mt: 2 }}
        >
          Save Advice
        </Button>
      </Box>

      {editIndex !== null && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Edit Appointment</Typography>
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 2 }}
          >
            Update Appointment
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Patient Appointments</Typography>
        <List>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <ListItem 
                key={index} 
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`Patient: ${appointment.patient || 'No name provided'}`}
                  secondary={`Date: ${appointment.date || 'No date provided'}, Time: ${appointment.time || 'No time provided'}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No appointments found.</Typography>
          )}
        </List>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default DoctorDashboard;*/}




