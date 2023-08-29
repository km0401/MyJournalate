import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { createBrowserHistory } from 'history'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

function HomePage() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [journalTitle, setJournalTitle] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const [journalDay, setJournalDay] = useState(selectedDate.format('dddd'));
  const history = createBrowserHistory(); 

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const formattedDay = dayjs(date).format('dddd');
      setJournalDay(formattedDay);
    } else {
      setJournalDay('');
    }
  };

  const handleSaveJournal = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const journalData = {
      title: journalTitle,
      content: editorValue,
      date: selectedDate.toDate(), 
      day: journalDay,
      userId: user.sub,
    };

    try {
      const response = await axios.post('/api/journals', journalData);
      console.log('Journal saved:', response.data);
      setJournalTitle('');
      setJournalDay('');
      setEditorValue('');
      setSelectedDate(dayjs()); 
      history.push('/journals');
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box mt={12}/>
      <Container maxWidth="md" mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Create a New Journal Entry
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <CalendarTodayIcon fontSize="medium" color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {selectedDate.format('MMMM D, YYYY')} | {journalDay}
              </Typography>
            </Grid>
          </Grid>
          <TextField
            label="Journal Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={journalTitle}
            onChange={(event) => setJournalTitle(event.target.value)}
          />
          <Box mt={1.3}/>
          <DatePicker label="Select Date" value={selectedDate} onChange={handleDateChange} />
          <ReactQuill
            value={editorValue}
            onChange={setEditorValue}
            placeholder="Start writing your journal..."
            style={{ margin: '20px 0' }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveJournal}>
            Save Journal
          </Button>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}

export default HomePage;
