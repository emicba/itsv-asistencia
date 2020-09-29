import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const columns = [
    { title: 'Name', field: 'first_name' },
    { title: 'Surname', field: 'last_name' },
    { title: 'Dni', field: 'dni' },
    { title: 'Address', field: 'address' },
    { title: 'Status', field: 'status' },
    { title: 'Course', field: 'course_id' },
  ];

  const [student, setStudent] = useState([]);

  useEffect(() => {
    retrieveStudents();
  }, []);

  const retrieveStudents = async () => {
    const res = await fetch('http://localhost:8000/students/');
    const data1 = await res.json();

    setStudent(data1);
  };

  return (
    <MaterialTable
      title="Estudiantes"
      columns={columns}
      data={student}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setStudent((prevState) => {
                const data = [...prevState];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              if (oldData) {
                const res = fetch(
                  `http://localhost:8000/students/${oldData.id}`,
                  {
                    method: 'PATCH',
                    body: JSON.stringify({ newData }),
                  }
                );
                retrieveStudents();
                resolve();
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const res = fetch(
                `http://localhost:8000/students/${oldData.id}`,
                {
                  method: 'DELETE',
                }
              );
              retrieveStudents();
              resolve();
            }, 600);
          }),
      }}
    />
  );
}
