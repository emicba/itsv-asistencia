import React, { Component } from "react";
import "../assets/css/Layout.css";

import PersistentDrawerLeft from "./Drawer";
import MaterialTableDemo from "./Table";

function Layout() {
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <MaterialTableDemo></MaterialTableDemo>
    </div>
  );
}

export default Layout;
