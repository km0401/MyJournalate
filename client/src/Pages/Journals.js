import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Grid, Paper, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Journals() {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth0();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        if (user) { 
          const response = await axios.get(`/api/journals/${user.sub}`);
          setJournals(response.data);
          console.log('Journals response:', response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching journals:', error);
        setIsLoading(false);
      }
    };

    fetchJournals();
  }, [user]); 

  return (
    <Box sx={{marginLeft: '5%'}}>
    <Box mt={10}/>
    <Grid container spacing={2}>
    {journals.map((journal) => (
      <Grid item xs={7} key={journal._id}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <CalendarTodayIcon fontSize="large" color="primary" />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2" gutterBottom>
                  {new Date(journal.date).toDateString()} | {journal.day}
                </Typography>
                <Typography variant="h6">
                  {journal.title}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {new Date(journal.date).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" component="div">
                  <div dangerouslySetInnerHTML={{ __html: journal.content }} />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
  </Box>
  );
}

export default Journals;
