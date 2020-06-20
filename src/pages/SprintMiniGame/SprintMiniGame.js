import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Stepper } from './components/Stepper/Stepper';
import { Timer } from './components/Timer/Timer';
import { Score } from './components/Score/Score'

import './SprintMiniGame.scss'

const useStyles = makeStyles({
  root: {
    minWidth: 475,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hr: {
    width: '90%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url(/images/backgrounds/SprintMiniGameBackground.jpg) center no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
  }
});

export function SprintMiniGame() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Timer />
      <Score />
      <Card className={classes.root}>
        <Stepper />
        <CardContent className={classes.content}>
          <Typography variant="h3" component="h3">
            word
          </Typography>
          <Typography variant="h3" component="h3">
            translate
          </Typography>
        </CardContent>
        <hr className={classes.hr}/>
        <CardActions>
        <Button variant="contained" color="primary" size="large">
          right
        </Button>
        <Button variant="contained" color="secondary" size="large">
          wrong
        </Button>
        </CardActions>
      </Card>
    </div>
  );
}
