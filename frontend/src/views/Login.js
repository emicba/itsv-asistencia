import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from '../UserContext';
import API from '../API';
import { Chip, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 3rem',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const usernameHandler = e => {
    setUsername(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };
  const loginHandler = async e => {
    e.preventDefault();
    setError(null);
    try {
      const { token, role } = await API.login(username, password);
      setUser({ token, role });
      localStorage.setItem('itsv-asistencia-token', token);
      localStorage.setItem('itsv-asistencia-role', role);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        className={classes.paper}
        style={{ marginTop: '5rem' }}
        elevation={2}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form onSubmit={loginHandler} className={classes.form} noValidate>
          <TextField
            onChange={usernameHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Nombre de usuario"
            name="Username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={passwordHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar sesión
          </Button>
        </form>
        {!!error && (
          <Chip
            label={error}
            color="secondary"
            onDelete={() => setError(null)}
          />
        )}
      </Paper>
    </Container>
  );
}
