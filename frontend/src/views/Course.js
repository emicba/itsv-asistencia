import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../API';
import StudentsTable from '../components/StudentsTable';
import AddIcon from '@material-ui/icons/Add';

export default function Course() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await API.fetch(`courses/${courseId}`);
      setCourse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {course ? (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <Typography variant="h5">Course: {course.name}</Typography>
            <Typography variant="h5">
              Number of Students: {course.students.length}
            </Typography>
            <Link to={`/attendance`} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: '2rem', float: 'right' }}
                startIcon={<AddIcon />}
              >
                Take Attendance
              </Button>
            </Link>
          </div>

          <StudentsTable course={course} />
        </div>
      ) : (
        <CircularProgress style={{ marginTop: '15rem' }} />
      )}
    </div>
  );
}
