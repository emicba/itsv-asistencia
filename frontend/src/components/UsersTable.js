import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import API from '../API';

export default function UsersMaterialTable({ users }) {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  const columns = [
    { title: 'Usuario', field: 'username', defaultSort: 'asc' },
    { title: 'Apellido', field: 'last_name' },
    { title: 'Nombre', field: 'first_name' },
    { title: 'Contraseña', field: 'password' },
    { title: 'Admin', field: 'admin', type: 'boolean' },
  ];

  return (
    !!user && (
      <MaterialTable
        title="Usuarios"
        columns={columns}
        data={user}
        options={{
          paging: false,
        }}
        editable={{
          onRowAdd: newData => {
            return new Promise(resolve => {
              setTimeout(async () => {
                try {
                  API.users.create(newData);
                  setUsers(prevState => [...prevState, newData]);
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
                    API.users.update(newData.id, newData);
                    setUsers(prevState => {
                      return prevState.map(user => {
                        return user.id === newData.id ? newData : user;
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
                  API.users.delete(oldData.id);
                  setUsers(prevState =>
                    prevState.filter(user => user.id !== oldData.id),
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
