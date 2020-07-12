import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Fade,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
  Popper,
  withStyles,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { connect } from 'react-redux'

class UserMenu extends Component {
  state = {
    userMenuOpen: false,
    auth: this.props.authStatus
  };
  anchorRef = React.createRef();

  handleProfileMenuOpen = () => {
    this.setState({ userMenuOpen: (prevOpen) => !prevOpen });
  };

  handleClose = (event) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }
    this.setState({ userMenuOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { userMenuOpen, auth } = this.state;
    return (
      <div>
        <Button
          ref={this.anchorRef}
          aria-controls={userMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={this.handleProfileMenuOpen}
          className={classes.accountBtn}>
          <AccountCircle />
        </Button>
        <Popper
          open={Boolean(userMenuOpen)}
          anchorEl={this.anchorRef.current}
          role={undefined}
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList autoFocusItem={Boolean(userMenuOpen)} id='menu-list-grow'>
                    <MenuItem onClick={this.handleClose} to='/account' component={RouterLink}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                    <MenuItem onClick={this.handleClose} to='/signin' component={RouterLink}>
                      {auth ? 'Logout' : 'Login'}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

function createStyles(theme) {
  return {
    accountBtn: {
      marginRight: theme.spacing(2),
    },
  };
}

function mapState({authReducer: { authStatus } } ) {
  return {
    authStatus
  };
}

export default connect(mapState)(withStyles(createStyles)(UserMenu));


