import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import {signURL, createURL } from '../../constants/authURL'

import {
  addFirstName,
  addLastName,
  addEmail,
  addToken,
  addUserId
  }  from '../../store/actions/authAction'
import { connect } from 'react-redux';

 function Alert(props) {
  function getResponse(emailInput, passwordInput){
    if(props.action === 'login'){
      doTransition('/signin')
      const loginUser = async user => {
        try{
          const rawResponse = await fetch(signURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
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
        } catch (e) {
          setTitle('Server error')
        }
      };
      loginUser({ "email": emailInput, "password": passwordInput }).then((entryData) => {
        if(typeof entryData !== undefined){
          setTitle('Login success')
          doTransition('/main')
          props.dispatch(addEmail(emailInput))
          props.dispatch(addToken(entryData.token))
          props.dispatch(addUserId(entryData.userId))
        }
      })

    }

    if(props.action === 'register'){
      doTransition('/signup')
      const createUser = async user => {
        try{
        const rawResponse = await fetch(createURL, {
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
            setTitle('Entered email already exist')
        }
        const content = await rawResponse.json();
        return content;
        } catch(e) {
          setTitle('Server error')
        }
      };
    createUser({ "email": emailInput, "password": passwordInput }).then((regData) => {
      if(typeof regData !== undefined){
        setTitle('Server error')
      } else if('error' in regData){
        setTitle('Registration error')
      }else{
        props.dispatch(addFirstName(props.firstNameInput))
        props.dispatch(addLastName(props.lastNameInput))
        setTitle('Registration successful')
        doTransition('/signin')

      }
    })
  }
}

  const [title, setTitle] = useState('');
  const [emailTitle, setEmailStatus] = useState('');
  const [passwordTitle, setPasswordStatus] = useState('');
  const [transition, doTransition] = useState('');

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
        <Link
          component={RouterLink}
          to={transition}
        >
          <Button onClick={handleClose} color="primary" autoFocus>
              OK
          </Button>

        </Link>


        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapState(state){
  return state
}

export default connect(mapState)(Alert)
