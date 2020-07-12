import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Avatar, Typography, withStyles } from '@material-ui/core';
import logoImg from '../../assets/logo.png';

const Logo = ({ classes: { mainLink, logo, title } }) => {
  return (
    <Link to='/home' component={RouterLink} className={mainLink}>
      <Avatar alt='logo' src={logoImg} className={logo} />
      <Typography variant='h6' className={title}>
        RS Lang
      </Typography>
    </Link>
  );
};

function createStyles(theme) {
  return {
    title: {
      flexGrow: 1,
      whiteSpace: 'nowrap',
    },
    mainLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      textShadow: '0 0 5px #0028',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    logo: {
      boxShadow: '0 0 5px #0028',
      marginRight: theme.spacing(1),
    },
  };
}

export default withStyles(createStyles)(Logo);
