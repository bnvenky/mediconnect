/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Snackbar, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PatientDashboard = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [file, setFile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [availability, setAvailability] = useState('');
  const [advice, setAdvice] = useState('');
  const [patientName, setPatientName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
      const storedAvailability = JSON.parse(localStorage.getItem('availability') || '""');
      const storedAdvice = JSON.parse(localStorage.getItem('advice') || '""');

      setAppointments(storedAppointments);
      setDocuments(storedDocuments);
      setAvailability(storedAvailability);
      setAdvice(storedAdvice);
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      localStorage.removeItem('appointments');
      localStorage.removeItem('documents');
      localStorage.removeItem('availability');
      localStorage.removeItem('advice');
    }
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setPatientName(event.target.value);
  };

  const handleScheduleConsultation = () => {
    if (!date || !time || !patientName) {
      setSnackbarMessage('Please provide date, time, and your name.');
      setSnackbarOpen(true);
      return;
    }

    const newAppointment = { date, time, patient: patientName };
    const newAppointments = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
    setAppointments(newAppointments);
    setDate('');
    setTime('');
    setPatientName('');
    setSnackbarMessage('Consultation scheduled successfully');
    setSnackbarOpen(true);
  };

  const handleUploadDocument = () => {
    if (!file) {
      setSnackbarMessage('Please select a file to upload.');
      setSnackbarOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newDocument = { document: reader.result, patient: patientName };
      const newDocuments = [...documents, newDocument];
      localStorage.setItem('documents', JSON.stringify(newDocuments));
      setDocuments(newDocuments);
      setFile(null); // Clear the file input after upload
      setSnackbarMessage('Document uploaded successfully');
      setSnackbarOpen(true);
    };
    reader.readAsDataURL(file); // Read file as base64 string
  };

  const handleEdit = (index) => {
    const appointmentToEdit = appointments[index];
    setEditIndex(index);
    setDate(appointmentToEdit.date || '');
    setTime(appointmentToEdit.time || '');
    setPatientName(appointmentToEdit.patient || '');
  };

  const handleUpdate = () => {
    if (!date || !time || !patientName) {
      setSnackbarMessage('Please provide date, time, and your name.');
      setSnackbarOpen(true);
      return;
    }

    const updatedAppointments = appointments.map((appointment, index) => 
      index === editIndex
        ? { ...appointment, date, time, patient: patientName }
        : appointment
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setEditIndex(null);
    setDate('');
    setTime('');
    setPatientName('');
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

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>

      <Typography variant="h6" gutterBottom>Doctor's Availability</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">{availability || 'No availability set by the doctor.'}</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>Doctor's Advice</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">{advice || 'No advice given by the doctor.'}</Typography>
      </Box>

      <TextField
        label="Patient Name"
        fullWidth
        margin="normal"
        value={patientName}
        onChange={handleNameChange}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Time"
        type="time"
        fullWidth
        margin="normal"
        value={time}
        onChange={handleTimeChange}
        InputLabelProps={{ shrink: true }}
      />
      {editIndex !== null ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Update Appointment
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleConsultation}
          sx={{ mt: 2 }}
        >
          Schedule Consultation
        </Button>
      )}

      <Box sx={{ mt: 4 }}>
        <input
          type="file"
          accept="application/pdf, image/*"
          onChange={handleFileChange}
          style={{ display: 'block', marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadDocument}
        >
          Upload Document
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Your Appointments</Typography>
        <List>
          {appointments.map((appointment, index) => (
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
                primary={`Patient: ${appointment.patient}`}
                secondary={`Date: ${appointment.date}, Time: ${appointment.time}`}
              />
            </ListItem>
          ))}
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

export default PatientDashboard;
