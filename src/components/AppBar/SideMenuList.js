import React, { Component } from 'react';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  withStyles,
} from '@material-ui/core';

import { pageLinks } from '../../constants/pageLinks.js';

class SideMenuList extends Component {
  render() {
    return (
      <List>
        {pageLinks.map((item, index) => (
          <React.Fragment key={'link' + index}>
            {index > 1 && pageLinks[index - 1].type !== item.type && (
              <Divider />
            )}
            <Link
              href={item.link}
              title={item.title}
              className={this.props.classes.link}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          </React.Fragment>
        ))}
      </List>
    );
  }
}

function createStyles(theme) {
  return {
    link: {
      display: 'flex',
      alignItems: 'center',
      color: '#001',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  };
}

export default withStyles(createStyles)(SideMenuList);
