import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import API from '../API';
import { useHistory } from 'react-router-dom';

export default function StudentsTable({ course }) {
  const [students, setStudents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setStudents(course.students);
  }, [course]);

  const columns = [
    { title: 'Orden', field: 'order', defaultSort: 'asc' },
    { title: 'Apellido', field: 'last_name' },
    { title: 'Nombre', field: 'first_name' },
    {
      title: 'Estado',
      field: 'status',
      lookup: {
        1: 'Cursando',
        2: 'Egresado',
        3: 'Salido con pase',
        4: 'Salido sin pase',
      },
    },
  ];

  return (
    !!students && (
      <MaterialTable
        title="Estudiantes"
        columns={columns}
        data={students}
        options={{
          paging: false,
          exportButton: { pdf: true },
        }}
        localization={{
          toolbar: {
            exportPDFName: 'Guardar como PDF',
            searchPlaceholder: 'Buscar',
          },
        }}
        onRowClick={(e, row) => {
          history.push(`/student/${row.id}`);
        }}
        editable={{
          onRowAdd: newData => {
            const newStudent = { ...newData, course: course.id };
            return new Promise(resolve => {
              setTimeout(async () => {
                try {
                  const data = await API.students.add(newStudent);
                  setStudents(prevState => [...prevState, data]);
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
    )
  );
}
