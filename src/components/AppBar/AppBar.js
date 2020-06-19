import React, { Component } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SideMenuList from './SideMenuList';
import UserMenu from './UserMenu';
import Logo from './Logo';

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
        <Drawer
          variant='permanent'
          className={clsx(this.props.classes.drawer, {
            [this.props.classes.drawerOpen]: this.state.drawerOpen,
            [this.props.classes.drawerClose]: !this.state.drawerOpen,
          })}
          classes={{
            paper: clsx({
              [this.props.classes.drawerOpen]: this.state.drawerOpen,
              [this.props.classes.drawerClose]: !this.state.drawerOpen,
            }),
          }}>
          <div className={this.props.classes.chevron}>
            <IconButton onClick={this.handleDrawerClose}>
              {this.state.drawerOpen ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <SideMenuList />
        </Drawer>
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
    chevron: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
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
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: 'rgba(243,245,255,1)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
      backgroundColor: 'rgba(243,245,255,1)',
    },
    paper: {
      marginLeft: theme.spacing(2),
    },
  };
}

export default withStyles(createStyles)(PrimaryAppBar);
