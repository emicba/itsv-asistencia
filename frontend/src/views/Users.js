import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import API from '../API';
import Loading from '../components/Loading';
import { useCommonStyles } from '../utils';
import UsersTable from '../components/UsersTable';

const Users = () => {
  const classes = useCommonStyles();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await API.fetch(`teachers/`);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {!!users ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Typography variant="h5">Usuarios</Typography>
          </Paper>

          <Paper>
            <UsersTable users={users} />
          </Paper>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Users;
