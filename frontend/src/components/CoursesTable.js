import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CourseTable = () => {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveCourses();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCourses = async () => {
    const res = await fetch('http://localhost:8000/courses/');
    const data = await res.json();

    setCourses(data);
  };

  const removeCourses = course => {
    const res = fetch(`http://localhost:8000/courses/${course}`, {
      method: 'DELETE',
    });
    retrieveCourses();
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
            {courses &&
              courses.map(course => (
                <Link
                  to={`/student/${course.id}`}
                  style={{ display: 'table-row', textDecoration: 'none' }}
                >
                  <TableCell className="list-group-item active">
                    {course.name}
                  </TableCell>
                </Link>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseTable;
