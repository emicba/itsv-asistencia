import React from 'react';
import MaterialTable from 'material-table';

/**
 * @type {import('material-table').Column[]}
 */
const columns = [
  { title: 'Orden', field: 'order', defaultSort: 'asc' },
  { title: 'Apellido', field: 'last_name' },
  { title: 'Nombre', field: 'first_name' },
  {
    title: '% de asistencia',
    field: 'attendance_percentage',
    render: rowData => (
      <>
        {rowData.attendance_percentage
          ? `${rowData.attendance_percentage}%`
          : '-'}
      </>
    ),
  },
];

const StudentsSubjectTable = ({ students }) => {
  return (
    <MaterialTable
      title="Estudiantes"
      columns={columns}
      data={students}
      options={{
        paging: false,
        exportButton: { pdf: true },
        draggable: false,
      }}
      localization={{
        toolbar: {
          exportPDFName: 'Guardar como PDF',
          searchPlaceholder: 'Buscar',
        },
      }}
    ></MaterialTable>
  );
};

export default StudentsSubjectTable;
