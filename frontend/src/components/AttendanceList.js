import React from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const AttendanceList = ({
  students,
  attendance,
  toggleAttendance,
  justified,
  toggleJustified,
}) => {
  const handleToggleAttendance = id => {
    toggleAttendance(id);
  };

  const handleToggleJustified = id => {
    toggleJustified(id);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Asistencia</TableCell>
            <TableCell>Justificado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>
                {`${student.last_name} ${student.first_name}`}
              </TableCell>
              <TableCell>
                <Checkbox
                  edge="end"
                  onChange={() => handleToggleAttendance(student.id)}
                />
              </TableCell>
              <TableCell>
                {!attendance[student.id] && (
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggleJustified(student.id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceList;
