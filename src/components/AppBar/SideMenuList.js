import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const SideMenuList = ({ classes: { link }, onClick }) => {
  return (
    <List>
      {pageLinks.map((item, index) => (
        <React.Fragment key={'link' + index}>
          {index > 1 && pageLinks[index - 1].type !== item.type && <Divider />}
          <Link component={RouterLink} to={item.link} title={item.title} className={link}>
            <ListItem button onClick={onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        </React.Fragment>
      ))}
    </List>
  );
};

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
