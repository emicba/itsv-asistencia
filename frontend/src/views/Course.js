import { Button, Paper, Typography, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import StudentsTable from '../components/StudentsTable';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../components/Loading';
import { readExcel, useCommonStyles } from '../utils';
import { UserContext } from '../UserContext';

export default function Course() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const classes = useCommonStyles();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCourse(courseId);
  }, [courseId]);

  const fetchCourse = async id => {
    try {
      const data = await API.fetch(`courses/${id}`);
      setCourse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fileSelectedHandler = async event => {
    try {
      const {
        target: { files },
      } = event;

      const file = files[0];

      const data = await readExcel(file);

      const newStudents = data.reduce((acc, el) => {
        acc.push({
          order: el.Orden,
          first_name: el.Nombre,
          last_name: el.Apellido,
          course: courseId,
          status: 1,
        });
        return acc;
      }, []);

      setCourse(prevState => {
        return {
          ...prevState,
          students: [...prevState.students, ...newStudents],
        };
      });

      await API.students.add(newStudents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {course ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={9}>
                <Typography variant="h5">{course.name}</Typography>
                <Typography variant="subtitle1">
                  Cantidad de estudiantes: {course.students.length}
                </Typography>
              </Grid>
              {user.role === 'admin' && (
                <Grid item xs={12} sm={3}>
                  <input
                    id="upload-file"
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={e => fileSelectedHandler(e)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="upload-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      style={{ margin: '2rem', float: 'right' }}
                      startIcon={<AddIcon />}
                    >
                      Importar estudiantes
                    </Button>
                  </label>
                </Grid>
              )}
            </Grid>
          </Paper>

          <StudentsTable course={course} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
