import React, { Component } from 'react';
import { Link, Avatar, Typography, withStyles } from '@material-ui/core';
import logo from '../../assets/logo.png';

class Logo extends Component {
  render() {
    return (
      <Link href='#main' className={this.props.classes.mainLink}>
        <Avatar alt='logo' src={logo} className={this.props.classes.logo} />
        <Typography variant='h6' className={this.props.classes.title}>
          RS Lang
        </Typography>
      </Link>
    );
  }
}

function createStyles(theme) {
  return {
    title: {
      flexGrow: 1,
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
