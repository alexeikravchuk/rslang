import React, { Component } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from './UserMenu';
import Logo from './Logo';
import SideBar from './SideBar';

import { Route, Switch } from 'react-router-dom'

import HomePage from '../../pages/Home/HomePage'
import AboutTeamPage from '../../pages/AboutTeamPage/AboutTeamPage';
import {Savannah} from "../../pages/Savannah";

class PrimaryAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      drawerOpen: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: this.state.drawerOpen,
          })}>
          <Toolbar className={this.props.classes.toolbar}>
            <IconButton
              onClick={this.handleDrawerOpen}
              edge='start'
              className={clsx(this.props.classes.menuButton, {
                [this.props.classes.hide]: this.state.drawerOpen,
              })}>
              <MenuIcon />
            </IconButton>
            <Logo />
            <UserMenu />
          </Toolbar>
        </AppBar>
        <SideBar open={this.state.drawerOpen} onShewronClick={() => this.handleDrawerClose()}/>
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route path='/about' component={AboutTeamPage}/>
        <Route path='/savannah' component={Savannah}/>
      </Switch>
      </React.Fragment>
    );
  }
}

function createStyles(theme) {
  const drawerWidth = 210;
  return {
    appBar: {
      position: 'fixed',
      background:
        'linear-gradient(0deg, rgba(71,71,74,1) 0%, rgba(123,123,158,1) 10%, rgba(233,251,255,1) 100%)',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: '0.3s ease-in',
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      color: '#005',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      opacity: 0,
      pointerEvents: 'none',
    },
  };
}

export default withStyles(createStyles)(PrimaryAppBar);
