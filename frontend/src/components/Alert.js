import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const Alert = ({
  show,
  handleClose,
  message,
  declineFunction,
  agreeFunction,
}) => {
  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>
        <DialogContentText>{message}</DialogContentText>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={() => {
            agreeFunction();
            handleClose();
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
