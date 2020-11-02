import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import API from '../API';

export default function StudentsTable({ course }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(course.students);
  }, [course]);

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

  return (
    <MaterialTable
      title="Estudiantes"
      columns={columns}
      data={students}
      editable={{
        onRowAdd: newData => {
          const newStudent = { ...newData, course: course.id };
          return new Promise(resolve => {
            setTimeout(async () => {
              try {
                API.students.add(newStudent);
                setStudents(prevState => [...prevState, newStudent]);
              } catch (error) {
                console.error(error);
              }
              resolve();
            }, 0);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise(resolve => {
            setTimeout(async () => {
              if (oldData) {
                try {
                  API.students.update(newData.id, newData);
                  setStudents(prevState => {
                    return prevState.map(student => {
                      return student.id === newData.id ? newData : student;
                    });
                  });
                } catch (error) {
                  console.error(error);
                }
                resolve();
              }
            }, 0);
          });
        },
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(async () => {
              try {
                API.students.delete(oldData.id);
                setStudents(prevState =>
                  prevState.filter(student => student.id !== oldData.id),
                );
              } catch (error) {
                console.error(error);
              }
              resolve();
            }, 0);
          }),
      }}
    />
  );
}
