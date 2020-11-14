import { Grid, Typography, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import Loading from '../components/Loading';
import MeetTable from '../components/MeetTable';
import { formatDate, useCommonStyles } from '../utils';

const Meet = () => {
  const { id: subjectId, start_date: startDate } = useParams();
  const [subject, setSubject] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const classes = useCommonStyles();

  useEffect(() => {
    fetchCourse(subjectId);
    fetchAttendance(subjectId, startDate);
  }, [subjectId, startDate]);

  const fetchCourse = async id => {
    try {
      const data = await API.fetch(`subjects/${id}`);
      setSubject(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async (id, date) => {
    try {
      const data = await API.fetch(
        `attendances?subject=${id}&start_date=${date}`,
      );
      setAttendance(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {subject && attendance ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={9}>
                <Typography variant="h5">
                  {subject.name} - {subject.course.name}
                </Typography>
                <Typography variant="subtitle1">
                  {subject.teachers
                    .map(x => `${x.first_name} ${x.last_name}`)
                    .join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ textTransform: 'capitalize' }}
                >
                  {formatDate(Date.parse(startDate))}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <MeetTable attendance={attendance} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Meet;
