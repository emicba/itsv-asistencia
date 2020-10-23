import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function StudentTable() {
  const { id: courseId, name: courseName } = useParams();
  const [student, setStudent] = useState([]);
  const [lenght, setLenght] = useState(0);

  const columns = [
    { title: 'Name', field: 'first_name' },
    { title: 'Surname', field: 'last_name' },
    { title: 'Dni', field: 'dni' },
    { title: 'Address', field: 'address' },
    {
      title: 'Status',
      field: 'status',
      lookup: {
        1: 'CURSANDO',
        2: 'EGRESADO',
        3: 'SALIDO CON PASE',
        4: 'SALIDO SIN PASE',
      },
    },
  ];

  useEffect(() => {
    retrieveStudents();
  }, []);

  const retrieveStudents = async () => {
    const res = await fetch(
      `http://localhost:8000/students/?course_id=${courseId}`,
    );
    const data1 = await res.json();
    const lenght = await data1.length;

    setStudent(data1);
    setLenght(lenght);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Typography variant="h5" style={{ marginRight: '6rem' }}>
          Course: {courseName}
        </Typography>
        <Typography variant="h5">Number of Students: {lenght}</Typography>
      </div>
      <Link to={`/attendance`} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: '2rem', float: 'right', marginTop: '-1.4rem' }}
          startIcon={<AddIcon />}
        >
          Take Attendance
        </Button>
      </Link>

      <MaterialTable
        title="Students"
        columns={columns}
        data={student}
        style={{ marginTop: '3rem' }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(async () => {
                const res = await fetch(`http://localhost:8000/students/`, {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify({ ...newData, course_id: courseId }),
                });
                retrieveStudents();
                resolve();
              }, 0);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(async () => {
                if (oldData) {
                  const res = await fetch(
                    `http://localhost:8000/students/${newData.id}/`,
                    {
                      method: 'PUT',
                      headers: { 'Content-type': 'application/json' },
                      body: JSON.stringify(newData),
                    },
                  );
                  retrieveStudents();
                  resolve();
                }
              }, 0);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(async () => {
                const res = await fetch(
                  `http://localhost:8000/students/${oldData.id}/`,
                  {
                    method: 'DELETE',
                  },
                );
                retrieveStudents();
                resolve();
              }, 0);
            }),
        }}
      />
    </div>
  );
}
