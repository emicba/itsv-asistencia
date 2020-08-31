import React, { Component } from 'react';
import '../assets/css/NavBar.css'
//Imports Material Ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'    

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 5,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function ButtonAppBar() {
 const classes = useStyles();
        return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ITSV ASISTENCIA
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>    
        )   
    }

