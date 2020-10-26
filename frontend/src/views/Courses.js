import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import API from '../API';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CourseTable = () => {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await API.fetch('courses/');
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseClick = id => {
    history.push(`/course/${id}`);
  };

  return (
    <div style={{ marginTop: '4.5rem' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Cursos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!courses &&
              courses.map(course => (
                <TableRow
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{course.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseTable;
