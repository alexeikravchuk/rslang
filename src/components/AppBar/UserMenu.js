import React, { Component } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      userMenuOpen: false,
    };
    this.anchorRef = React.createRef();
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ userMenuOpen: (prevOpen) => !prevOpen });
  };

  handleClose = (event) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }
    this.setState({ userMenuOpen: false });
  };

  render() {
    return (
      <div>
        <Button
          ref={this.anchorRef}
          aria-controls={this.state.userMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={this.handleProfileMenuOpen}
          className={this.props.classes.accountBtn}>
          <AccountCircle />
        </Button>
        <Popper
          open={Boolean(this.state.userMenuOpen)}
          anchorEl={this.anchorRef.current}
          role={undefined}
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList autoFocusItem={Boolean(this.state.userMenuOpen)} id='menu-list-grow'>
                    <MenuItem onClick={this.handleClose} to='/account' component={RouterLink}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                    <MenuItem onClick={this.handleClose} to='/signin' component={RouterLink}>
                      {this.state.auth ? 'Login' : 'Logout'}
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

export default withStyles(createStyles)(UserMenu);
