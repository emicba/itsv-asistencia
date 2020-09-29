import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

export default function StudentsTable() {
  const [student, setStudent] = useState([]);
  const [courses, setCourses] = useState([]);

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
    {
      title: 'Course',
      field: 'course_id',
      type: 'numeric',
    },
  ];

  useEffect(() => {
    retrieveStudents();
    retrieveCourses();
  }, []);

  const retrieveStudents = async () => {
    const res = await fetch(`http://localhost:8000/students/`);
    const data1 = await res.json();

    setStudent(data1);
  };

  const retrieveCourses = async () => {
    const res = await fetch('http://localhost:8000/courses/');
    const data = await res.json();

    setCourses(data);
  };

  return (
    <MaterialTable
      title="Estudiantes"
      columns={columns}
      data={student}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(async () => {
              const res = await fetch(`http://localhost:8000/students/`, {
                method: 'POST',
                body: JSON.stringify(newData),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
              });
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(async () => {
              if (oldData) {
                const res = await fetch(
                  `http://localhost:8000/students/${newData.id}`,
                  {
                    method: 'PUT',
                    body: JSON.stringify({ newData }),
                  },
                );
                retrieveStudents();
                resolve();
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(async () => {
              const res = await fetch(
                `http://localhost:8000/students/${oldData.id}`,
                {
                  method: 'DELETE',
                },
              );
              retrieveStudents();
              resolve();
            }, 600);
          }),
      }}
    />
  );
}
