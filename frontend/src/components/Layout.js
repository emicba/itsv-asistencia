import React, { Component } from 'react';
import '../assets/css/Layout.css'

//Export Components
import NavBar from './NavBar';


function Layout() {
    return (
        <div>
            <h1>Titulo layout</h1>;
            <hr></hr>
            <NavBar></NavBar>
            
        </div>
    )
  }

export default Layout;