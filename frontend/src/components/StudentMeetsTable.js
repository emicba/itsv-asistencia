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
import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils';

const tableHead = [
  { orderField: 'start_date', title: 'Fecha' },
  { orderField: 'subject.name', title: 'Materia' },
  { orderField: 'attended', title: 'Atendió' },
  { orderField: 'justified', title: 'Justificado' },
];

const StudentMeetsTable = ({ meets }) => {
  const [sortedMeets, setSortedMeets] = useState(null);
  const [orderField, setOrderField] = useState('subject.name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    setSortedMeets(orderBy(cloneDeep(meets), [orderField], [order]));
  }, [meets, orderField, order]);

  const sortMeets = field => {
    if (orderField === field) {
      setOrder(x => (x === 'desc' ? 'asc' : 'desc'));
    } else {
      setOrderField(field);
    }
  };

  return (
    !!sortedMeets && (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map(x => (
                <TableCell key={x.orderField}>
                  <TableSortLabel
                    active={orderField === x.orderField}
                    direction={orderField === x.orderField ? order : 'asc'}
                    onClick={() => sortMeets(x.orderField)}
                  >
                    {x.title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMeets.map(meet => (
              <TableRow key={meet.id}>
                <TableCell style={{ textTransform: 'capitalize' }}>
                  {formatDate(Date.parse(meet.start_date))}
                </TableCell>
                <TableCell>{meet.subject.name}</TableCell>
                <TableCell>
                  <Checkbox checked={meet.attended} disableRipple />
                </TableCell>
                <TableCell>
                  <Checkbox checked={meet.justified} disableRipple />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default StudentMeetsTable;
