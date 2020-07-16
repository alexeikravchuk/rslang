import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { RecordVoiceOver, Extension, Pets, Hearing, DirectionsRun } from '@material-ui/icons';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  item: {
    minWidth: '40px',
  },
}));

export function SelectGame({ onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    onChange(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabPanel className={classes.caption} value={value} index={0}>
        Speak It
      </TabPanel>
      <TabPanel value={value} index={1}>
        English Puzzle
      </TabPanel>
      <TabPanel value={value} index={2}>
        Savannah
      </TabPanel>
      <TabPanel value={value} index={3}>
        Audio call
      </TabPanel>
      <TabPanel value={value} index={4}>
        Sprint
      </TabPanel>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab className={classes.item} label={<RecordVoiceOver />} {...a11yProps(0)} />
          <Tab className={classes.item} label={<Extension />} {...a11yProps(1)} />
          <Tab className={classes.item} label={<Pets />} {...a11yProps(2)} />
          <Tab className={classes.item} label={<Hearing />} {...a11yProps(3)} />
          <Tab className={classes.item} label={<DirectionsRun />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
