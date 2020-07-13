import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { AppBar, Toolbar, IconButton, Grid, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import UserMenu from './UserMenu';
import Logo from './Logo';
import SideBar from './SideBar';

import { SignIn } from '../Registration/SignIn';
import { SignUp } from '../Registration/SignUp';

import Dictionary from '../Dictionary/Dictionary';
import WordCards from '../WordCards/WordCards';
import Settings from '../Settings/Settings';
import Statistics from '../Statistics/Statistics'
import { connect } from 'react-redux';

import {
  HomePage,
  AccountInfo,
  SpeakIt,
  EnglishPuzzle,
  Savannah,
  AudioCall,
  AboutTeamPage,
  SprintMiniGame,
  PromoPage,
 
} from '../../pages';

import { addToken, addUserId, authStatus } from '../../store/actions/authAction';

import { LIFE_TIME_TOKEN } from '../../constants/lifeTimeToken';

const CheckRoute = ({ isLoggedIn, ...props }) =>
  isLoggedIn ? <Route {...props} /> : <Redirect to='/signin' />;

class PrimaryAppBar extends Component {
  state = {
    drawerOpen: false,
  };

  checkAuthorization = () => {
    if (localStorage.token) {
      try {
        const { dispatch } = this.props;
        const data = JSON.parse(window.atob(localStorage.token));
        const tokenTime = data.time && Date.now() - data.time;
        if (tokenTime < LIFE_TIME_TOKEN) {
          dispatch(authStatus(true));
          dispatch(addToken(data.token));
          dispatch(addUserId(data.userId));
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    document.body.style.overflow = 'auto';
    this.setState({ drawerOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { drawerOpen } = this.state;
    const auth = this.checkAuthorization();
    return (
      <React.Fragment>
        <div className={classes.appContainer}>
          <Grid container className={classes.grid}>
            <Grid item xs={12}>
              <AppBar
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: drawerOpen,
                })}>
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    onClick={this.handleDrawerOpen}
                    edge='start'
                    className={clsx(classes.menuButton, {
                      [classes.hide]: drawerOpen,
                    })}>
                    <MenuIcon />
                  </IconButton>
                  <Logo />
                  <UserMenu auth={auth} />
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <Grid container wrap='nowrap'>
                <Grid item>
                  <SideBar open={drawerOpen} onClick={this.handleDrawerClose} />
                </Grid>
                <Grid item xs className={classes.mainContainer}>
                  <Switch>
                  <Route path='/signin' component={SignIn}/>
                  <Route path='/signup' component={SignUp}/>
                    <CheckRoute isLoggedIn={ auth }  path='/home' component={HomePage} />
                    <CheckRoute isLoggedIn={ auth }  path='/wordcards' component={WordCards} />
                    <CheckRoute isLoggedIn={ auth }  path='/statistics' component={Statistics} />
                    <CheckRoute isLoggedIn={ auth }  path='/about' component={AboutTeamPage} />
                    <CheckRoute isLoggedIn={ auth }  path='/savannah' component={Savannah} />
                    <CheckRoute isLoggedIn={ auth }  path='/dictionary' component={Dictionary} />
                    <CheckRoute isLoggedIn={ auth }  path='/speakit' component={SpeakIt} />
                    <CheckRoute isLoggedIn={ auth }  path='/puzzle' component={EnglishPuzzle} />
                    <CheckRoute isLoggedIn={ auth }  path='/sprint' component={SprintMiniGame} />
                    <CheckRoute isLoggedIn={ auth }  path='/audiocall' component={AudioCall} />
                    <CheckRoute isLoggedIn={ auth }  path='/promo' component={PromoPage} />
                    <CheckRoute isLoggedIn={ auth }  path='/settings' render={() => <Settings {...this.props}/>} />
                    <CheckRoute isLoggedIn={ auth }  path='/account'>
                    <AccountInfo />
                    </CheckRoute>
                  </Switch>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

function createStyles(theme) {
  const drawerWidth = 210;
  const toolbarHeight = '65px';
  return {
    appContainer: {
      height: '100vh',
    },
    grid: {
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
    },
    mainContainer: {
      position: 'relative',
      right: 0,
      height: `calc(100vh - ${toolbarHeight})`,
      maxWidth: `100vw`,
      [theme.breakpoints.up('sm')]: {
        maxWidth: `calc(100% - ${theme.spacing(7) + 1}px)`,
        marginLeft: theme.spacing(7) + 1,
      },
    },
    appBar: {
      height: `${toolbarHeight}`,
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
      marginLeft: theme.spacing(0),
      color: '#005',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
      },
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

function mapState({ authReducer: { authStatus, token, userId } }) {
  return {
    authStatus,
    token,
    userId,
  };
}

export default connect(mapState)(withStyles(createStyles)(PrimaryAppBar));
