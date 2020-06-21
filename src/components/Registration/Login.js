import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Alert(props) {
  function getResponse(emailInput, passwordInput){

    if(props.action === 'login'){
      const loginUser = async user => {
        const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
          if(rawResponse.status === 404){  
            setTitle('Please, check the fields')
          }
          if(rawResponse.status === 403){
            setTitle('Incorrect data')
          }
        const content = await rawResponse.json();
        return content;
        
      };
      loginUser({ "email": emailInput, "password": passwordInput }).then((entryData) => {
        if(entryData.error.status === 'failed'){
          setTitle('Login failed')
        } else {
          setTitle('Login success')
          console.log(entryData)
        }
      })
    }
    if(props.action === 'register'){
      const createUser = async user => {
        const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if(rawResponse.status === 422){
            setTitle('Please, check the fields')
        }
        if(rawResponse.status === 417){
            setTitle('Entered user exist')
        }
        const content = await rawResponse.json();
        return content;
      };
      createUser({ "email": emailInput, "password": passwordInput }).then((regData) => {
        console.log(regData.status)
        if(regData.error.status === 'failed'){
          setTitle('Registration failed')
        } else {
          setTitle('Registration success')
          console.log(regData)
        }
      }) 
  }
}

  const [title, setTitle] = useState('');
  const [emailTitle, setEmailStatus] = useState('');
  const [passwordTitle, setPasswordStatus] = useState('');

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    if(props.emailInput.length === 0){
      setEmailStatus('Email field is empty')
    } else if(props.email){
      setEmailStatus('Incorrect email address')
    } else {
      setEmailStatus('')
    }
    if(props.passwordInput.length === 0){
      setEmailStatus('Password field is empty')
    } else if(props.password){
      setPasswordStatus('Incorrect password')
    } else {
      setPasswordStatus('')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        variant="contained"
        fullWidth       
        color="primary"
        onClick={() => { getResponse(props.emailInput, props.passwordInput); handleClickOpen()}}
        >
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {emailTitle}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {passwordTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
