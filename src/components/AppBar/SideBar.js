import React from 'react';
import clsx from 'clsx';
import { Drawer, IconButton, Divider, withStyles } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import SideMenuList from './SideMenuList';

const SideBar = ({ classes, onClick, open }) => {
  const { drawer, drawerOpen, drawerClose, chevron } = classes;

  return (
    <Drawer
      variant='permanent'
      className={clsx(drawer, {
        [drawerOpen]: open,
        [drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [drawerOpen]: open,
          [drawerClose]: !open,
        }),
      }}>
      <div className={chevron}>
        <IconButton onClick={onClick}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
      </div>
      <Divider />
      <SideMenuList onClick={onClick} />
    </Drawer>
  );
};

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
      position: 'fixed',
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      zIndex: 1000,
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
      width: 0,
      zIndex: 1000,
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
