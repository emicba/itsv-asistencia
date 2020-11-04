import { Button, Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import Loading from '../components/Loading';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UpdateIcon from '@material-ui/icons/Update';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: '1rem',
  },
}));

const Meet = () => {
  const { id: subjectId, start_date } = useParams();
  const [subject, setSubject] = useState(null);
  const [startTime, setStartTime] = React.useState(start_date);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetchCourse(subjectId);
  }, [subjectId]);

  const fetchCourse = async id => {
    try {
      const data = await API.fetch(`subjects/${id}`);
      setSubject(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = date => {
    setStartTime(date);
  };

  const goBack = async () => {
    history.push(`/subject/${subjectId}`);
  };

  const updateAttendance = async () => {
    // update function
    history.push(`/subject/${subjectId}`);
  };

  return (
    <div className={classes.container}>
      {subject ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">
                  {subject.name} - {subject.course.name}
                </Typography>
                <Typography variant="subtitle1">
                  {subject.teachers
                    .map(x => `${x.first_name} ${x.last_name}`)
                    .join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="Select date and time"
                    inputVariant="outlined"
                    value={startTime}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: '1rem', float: 'right' }}
                  startIcon={<ArrowBackIcon />}
                  onClick={goBack}
                >
                  Go back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: '1rem', float: 'right' }}
                  startIcon={<UpdateIcon />}
                  onClick={updateAttendance}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Meet;
