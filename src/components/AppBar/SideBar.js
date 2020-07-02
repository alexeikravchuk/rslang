import React, { Component } from 'react';
import clsx from 'clsx';
import { Drawer, IconButton, Divider, withStyles } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import SideMenuList from './SideMenuList';

class SideBar extends Component {
  render() {
    return (
      <Drawer
        variant='permanent'
        className={clsx(this.props.classes.drawer, {
          [this.props.classes.drawerOpen]: this.props.open,
          [this.props.classes.drawerClose]: !this.props.open,
        })}
        classes={{
          paper: clsx({
            [this.props.classes.drawerOpen]: this.props.open,
            [this.props.classes.drawerClose]: !this.props.open,
          }),
        }}>
        <div className={this.props.classes.chevron}>
          <IconButton onClick={() => this.props.onShewronClick()}>
            {this.props.open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <SideMenuList />
      </Drawer>
    );
  }
}

function createStyles(theme) {
  const drawerWidth = 210;
  return {
    chevron: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
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

export default withStyles(createStyles)(SideBar);
