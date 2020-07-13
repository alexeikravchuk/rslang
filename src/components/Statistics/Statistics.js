import React, { Component } from 'react';
import { Paper, withStyles, Container, Box, Typography, ButtonGroup, Button } from '@material-ui/core'


class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
    };
  }


  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <ButtonGroup variant="contained" color="primary" className={classes.buttons}>
          <Button>Current </Button>
          <Button>Summary</Button>
       </ButtonGroup>
        <Box className={classes.box}>
          <Paper className={classes.paper} />
            <Typography>
              
            </Typography>
          <Paper className={classes.paper} />
          <Paper className={classes.paper} />
          <Paper className={classes.paper} />
        </Box>
      </Container>
    );
  }
}

function createStyles(theme) {
  return {
    root:{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      alignItems: 'center'
    },
    buttons: {
      margin: theme.spacing(2),
    },
    box:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    paper: {
      height: 140,
      width: 100,
      margin: theme.spacing(2)
    },
  };
}

export default withStyles(createStyles)(Statistics);
