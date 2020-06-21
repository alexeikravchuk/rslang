import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Stepper } from '../index';

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

});

export function GameCard() {
  const classes = useStyles();

  return (
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<KeyboardArrowLeftIcon />}>
        right
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<KeyboardArrowRightIcon />}>
        wrong
      </Button>
      </CardActions>
    </Card>
  );
}
