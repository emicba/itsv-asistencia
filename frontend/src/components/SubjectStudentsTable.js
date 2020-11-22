import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCommonStyles } from '../utils';

const StudentsSubjectTable = ({ students }) => {
  const history = useHistory();
  const classes = useCommonStyles();

  const studentClickHandler = id => {
    history.push(`/student/${id}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alumno</TableCell>
            <TableCell>% de asistencia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow
              key={student.id}
              onClick={() => studentClickHandler(student.id)}
              className={classes.clickable}
            >
              <TableCell>
                {student.last_name} {student.first_name}
              </TableCell>
              <TableCell>{student.attendance_percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsSubjectTable;
