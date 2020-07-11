import React from 'react';
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
import { useState } from 'react';
import Login from './Login';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://app.rs.school/'>
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

export default function SignUp() {
  const [firstNameInput, setFirstName] = useState('');
  const [lastNameInput, setLastName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, checkEmail] = useState(false);
  const [passwordError, checkPassword] = useState(false);
  const classes = useStyles();

  function emailValid(value) {
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = emailCheck.test(value);
    return check;
  }

  function passwordValid(value) {
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+\-_@$!%*?&#.,;:[\]{}])[A-Za-z\d+\-_@$!%*?&#.,;:[\]{}]{8,}$/;
    const check = passwordCheck.test(value);
    return check;
  }

  const handleEmail = () => {
    const check = emailValid(emailInput);
    if (check) {
      checkEmail(false);
    } else {
      checkEmail(true);
    }
  };

  const handlePassword = () => {
    const check = passwordValid(passwordInput);
    if (check) {
      checkPassword(false);
    } else {
      checkPassword(true);
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt='logo' src={logo} />
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onInput={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onInput={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                input={emailInput}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='off'
                onInput={(e) => setEmailInput(e.target.value)}
                onBlur={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <Box component='span' display='block'>
                Email must contain correct domain
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError}
                input={passwordInput}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='off'
                onInput={(e) => setPasswordInput(e.target.value)}
                onBlur={handlePassword}
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Box component='span' display='block'>
                Use 8 or more english characters with a mix of letters (one upper and one lower
                case), numbers and symbols
              </Box>
            </Grid>
          </Grid>
          <Login
            firstNameInput={firstNameInput}
            lastNameInput={lastNameInput}
            emailInput={emailInput}
            passwordInput={passwordInput}
            email={emailError}
            password={passwordError}
            action='register'>
            Sign Up
          </Login>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/signin' href='#' variant='body2'>
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
