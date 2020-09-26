import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CourseDataService from '../services/CourseService';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BasicTable = () => {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveCourses();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCourses = async () => {
    const res = await fetch('http://localhost:8000/courses/');
    const data = await res.json();

    setCourses(data);
  };

  const refreshList = () => {
    retrieveCourses();
    setCurrentCourse(null);
    setCurrentIndex(-1);
  };

  const setActiveCourse = (course, index) => {
    setCurrentCourse(course);
    setCurrentIndex(index);
  };

  const removeAllCourses = (course) => {
    fetch(`http://localhost:8000/courses?name=${course}`, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        refreshList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses &&
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell
                    className="list-group-item actuve"
                    //onClick={() => setActiveCourse(course, index)}
                  >
                    {course.name}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
