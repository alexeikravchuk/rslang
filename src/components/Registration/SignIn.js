import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../assets/logo.png';
import Login from './Login'
import { Link as RouterLink } from 'react-router-dom';


function Copyright () {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://app.rs.school/">
          Team19
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function SignIn(props) {
  
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, checkEmail] = useState(false);
  const [passwordError, checkPassword] = useState(false);
  const classes = useStyles();

  function emailValid(value){
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = emailCheck.test(value);
    return check;
  }

  function passwordValid(value){
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+\-_@$!%*?&#.,;:[\]{}])[A-Za-z\d+\-_@$!%*?&#.,;:[\]{}]{8,}$/;
    const check = passwordCheck.test(value);
    return check;
}
  
  const handleEmail = () => {
    const check = emailValid(emailInput)
    if(check){
      checkEmail(false);
    } else {
      checkEmail(true);
    } 
  };

  const handlePassword = () => {
    const check = passwordValid(passwordInput)
    if(check){
      checkPassword(false);
    } else {
      checkPassword(true);
    } 
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar alt="logo" src={logo} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={emailError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onInput={e => setEmailInput(e.target.value)}
            onBlur={handleEmail}
          />
          <TextField
            error={passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onInput={e => setPasswordInput(e.target.value)}
            onBlur={handlePassword}
          />
          <Login 
            emailInput = {emailInput}
            passwordInput = {passwordInput}
            email={emailError}
            password={passwordError}
            action='login'
            store={props}
          >
            Sign In
          </Login>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                component={RouterLink} 
                to="/signup"
                variant="body2">
                Don't have an account? Sign Up

              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
