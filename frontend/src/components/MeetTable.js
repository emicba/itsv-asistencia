import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { cloneDeep, orderBy } from 'lodash';

const tableHead = [
  { orderField: 'student.last_name', title: 'Nombre' },
  { orderField: 'attended', title: 'Asistencia' },
  { orderField: 'justified', title: 'Justificado' },
];

const MeetTable = ({ attendance }) => {
  const [sortedAttendance, setSortedAttendance] = useState(null);
  const [orderField, setOrderField] = useState('student.last_name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    setSortedAttendance(orderBy(cloneDeep(attendance), [orderField], [order]));
  }, [attendance, orderField, order]);

  const sortAttendanceHandler = sortBy => {
    if (orderField === sortBy) {
      setOrder(x => (x === 'desc' ? 'asc' : 'desc'));
    } else {
      setOrderField(sortBy);
    }
  };

  return (
    !!sortedAttendance && (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map(x => (
                <TableCell key={x.orderField}>
                  <TableSortLabel
                    active={orderField === x.orderField}
                    direction={orderField === x.orderField ? order : 'asc'}
                    onClick={() => sortAttendanceHandler(x.orderField)}
                  >
                    {x.title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAttendance.map(x => (
              <TableRow key={x.id}>
                <TableCell>
                  {x.student.first_name} {x.student.last_name}
                </TableCell>
                <TableCell>
                  <Checkbox checked={x.attended}></Checkbox>
                </TableCell>
                <TableCell>
                  <Checkbox checked={x.justified}></Checkbox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default MeetTable;
