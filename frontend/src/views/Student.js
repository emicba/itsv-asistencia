import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import Loading from '../components/Loading';
import { useCommonStyles } from '../utils';
import StudentMeetsTable from '../components/StudentMeetsTable';

const Student = () => {
  const { id: studentId } = useParams();
  const classes = useCommonStyles();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent(studentId);
  }, [studentId]);

  const fetchStudent = async id => {
    try {
      const data = await API.fetch(`students/${id}`);
      setStudent(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {!!student ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={3}>
                <Typography variant="h5">
                  {student.last_name} {student.first_name}
                </Typography>
                <Typography variant="subtitle1">
                  {student.course.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} style={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">
                  Cantidad de clases: {student.meets.length}
                </Typography>
                <Typography variant="subtitle1">
                  % de asistencia: {student.attended_percentage}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper>
            <StudentMeetsTable meets={student.meets} />
          </Paper>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Student;
