import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import AttendanceList from '../components/AttendanceList';
import Loading from '../components/Loading';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';

const Attendance = () => {
  const { id: subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [attendance, setAttendace] = useState({});
  const [justified, setJustified] = useState({});
  const [startTime, setStartTime] = React.useState(new Date());
  const history = useHistory();

  const toggleAttendance = id => {
    setAttendace(prevState => {
      const newState = { ...prevState };
      newState[`${id}`] = !newState[`${id}`] || false;
      return newState;
    });
  };

  const toggleJustified = id => {
    setJustified(prevState => {
      const newState = { ...prevState };
      newState[`${id}`] = !newState[`${id}`] || false;
      return newState;
    });
  };

  useEffect(() => {
    fetchCourse(subjectId);
  }, [subjectId]);

  useEffect(() => {
    if (subject) {
      const defaultValues = subject.students.reduce((acc, el) => {
        acc[el.id] = false;
        return acc;
      }, {});
      setAttendace({ ...defaultValues });
      setJustified({ ...defaultValues });
    }
  }, [subject]);

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

  const submitAttendance = async () => {
    try {
      await API.attendace.post({
        subject: subjectId,
        start_date: Math.floor(+startTime / 1000),
        students: attendance,
        justified: justified,
      });
      history.push(`/subject/${subjectId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {subject ? (
        <div style={{ width: '100%', marginTop: '1rem' }}>
          <Grid
            container
            spacing={1}
            justify="space-between"
            alignItems="center"
          >
            <div>
              <Typography variant="h5">Subject: {subject.name}</Typography>
              <Typography variant="h5">
                Course: {subject.course_name}
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                style={{ marginLeft: '1rem', float: 'right' }}
                startIcon={<DoneIcon />}
                onClick={submitAttendance}
              >
                Submit
              </Button>
            </div>
          </Grid>
          <div style={{ marginTop: '1rem' }}>
            <AttendanceList
              students={subject.students}
              attendance={attendance}
              toggleAttendance={toggleAttendance}
              justified={justified}
              toggleJustified={toggleJustified}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Attendance;
