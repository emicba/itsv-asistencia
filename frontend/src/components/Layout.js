import React, { Component } from "react";
import "../assets/css/Layout.css";

import PersistentDrawerLeft from "./Drawer";
import MaterialTableDemo from "./Table";
import Login from "./Login";

function Layout() {
  return (
    <div>
      <Login></Login>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <MaterialTableDemo></MaterialTableDemo>
    </div>
  );
}

export default Layout;
