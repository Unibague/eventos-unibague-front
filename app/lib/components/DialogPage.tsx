'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface DialogPageProps {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
  children: React.ReactNode;
  cancelAction?: () => void;
  cancelActionLabel?: string;
  acceptAction?: () => void;
  acceptActionLabel?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogPage: React.FC<DialogPageProps> = ({
  open, 
  handleClose, 
  dialogTitle, 
  children,
  cancelAction,
  acceptAction,
  cancelActionLabel = 'Cancelar',
  acceptActionLabel = 'Aceptar'
}) => {

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
        {cancelAction && (
          <Button onClick={cancelAction}>{cancelActionLabel}</Button>
        )}
        {acceptAction && (
          <Button onClick={acceptAction}>{acceptActionLabel}</Button>
        )}
      </DialogActions>
      </Dialog>
  );
};

export default DialogPage;