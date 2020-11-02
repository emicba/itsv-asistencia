import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(2),
  },
  form: {
    marginLeft: theme.spacing(10),
    width: '50ch',
    marginTop: theme.spacing(2),
  },
}));

const AddStudent = () => {
  const classes = useStyles();

  const initialStudentState = {
    first_name: '',
    last_name: '',
    dni: '',
    address: '',
    status: '',
    course_id: '',
  };

  const [student, setStudent] = useState(initialStudentState);
  const [courses, setCourses] = useState([]);

  const handleChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = async () => {
    const res = await fetch(`http://localhost:8000/students/`, {
      method: 'POST',
      body: JSON.stringify(student),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const data = await res.json();
    setStudent(data);
    console.log(data);
  };

  useEffect(() => {
    retrieveCourses();
  }, []);

  const retrieveCourses = async () => {
    const res = await fetch('http://localhost:8000/courses/');
    const data = await res.json();

    setCourses(data);
  };

  return (
    <div>
      <h2 className={classes.formControl}>Añadir Estudiante</h2>
      <TextField
        required
        id="outlined-required"
        label="Nombre"
        variant="outlined"
        className={classes.form}
        type="text"
        value={student.first_name}
        onChange={handleChange}
        name="first_name"
      />
      <br></br>
      <TextField
        required
        id="outlined-required"
        label="Apellido"
        variant="outlined"
        className={classes.form}
        type="text"
        value={student.last_name}
        onChange={handleChange}
        name="last_name"
      />
      <br></br>
      <TextField
        required
        id="outlined-required"
        label="Dni"
        variant="outlined"
        className={classes.form}
        type="text"
        value={student.dni}
        onChange={handleChange}
        name="dni"
        max="8"
      />
      <br></br>
      <TextField
        required
        id="outlined-multiline-static"
        label="Dirección"
        variant="outlined"
        className={classes.form}
        multiline
        rows={4}
        value={student.address}
        onChange={handleChange}
        name="address"
      />
      <br></br>
      <FormControl variant="outlined" required className={classes.form}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Status"
          name="status"
        >
          <MenuItem value={1}>CURSANDO</MenuItem>
          <MenuItem value={2}>EGRESADO</MenuItem>
          <MenuItem value={3}>SALIDO CON PASE</MenuItem>
          <MenuItem value={4}>SALIDO SIN PASE</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <FormControl variant="outlined" required className={classes.form}>
        <InputLabel id="demo-simple-select-outlined-label">Curso</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Curso"
          name="course_id"
        >
          {courses &&
            courses.map(course => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <br></br>
      <Button
        className={classes.button}
        size="medium"
        variant="contained"
        color="primary"
        disableElevation
        onClick={saveStudent}
      >
        Guardar
      </Button>
    </div>
  );
};

export default AddStudent;
