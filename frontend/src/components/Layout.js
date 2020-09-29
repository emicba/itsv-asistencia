import React, { Component } from 'react';
import '../assets/css/Layout.css';

import PersistentDrawerLeft from './Drawer';
import StudentTable from './StudentTable';
import Login from './Login';

function Layout() {
  return (
    <div>
      <Login></Login>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <StudentTable></StudentTable>
    </div>
  );
}

export default Layout;
