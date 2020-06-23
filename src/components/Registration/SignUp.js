import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './logo.png';
import { useState } from 'react';

function Copyright() {
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function validateInput(check, input){
    if(check){  
        input.style.color = "#303F9F";
    } else {
        input.style.color = "red";
    }
}

function handleEmail(e){
    const emailField = document.getElementById('email');
    const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = emailCheck.test(e.target.value);
    validateInput(check, emailField);
}

function handlePassword(e){
    let passwordField = document.getElementById('password');
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\+\-_@$!%*?&#\.,;\:\[\]\{\}])[A-Za-z\d\+\-_@$!%*?&#\.,;\:\[\]\{\}]{8,}$/;
    const check = passwordCheck.test(e.target.value);
    validateInput(check, passwordField);
}

function getResponse(emailInput, passwordInput){
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
            console.log(rawResponse)
            alert('Please, check the fields')
        }
        if(rawResponse.status === 417){
            console.log(rawResponse)
            alert('Entered user exist')
        }
        const content = await rawResponse.json();
        return content;
      };
    createUser({ "email": emailInput, "password": passwordInput }).then((res) => {
        console.log(res)
    }) 
}


export default function SignUp() {
    
    function handleSubmit(e){

        getResponse(emailInput, passwordInput)
        e.preventDefault();
    }
    

  const classes = useStyles();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar alt="logo" src={logo} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate  onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                input={emailInput}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                onInput={e => setEmailInput(e.target.value)}
                onBlur={handleEmail}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
                <Box component="span" display="block">Email must contain correct domain</Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                input={passwordInput}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onInput={e => setPasswordInput(e.target.value)}
                onBlur={handlePassword}
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
            <Box component="span" display="block">Use 8 or more english characters with a mix of letters (one upper and one lower case), numbers and symbols</Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link 
                href="#" 
                variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
