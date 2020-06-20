import React  from "react";
import CloseButton from "../closeButton/CloseButton";
import Button from '@material-ui/core/Button'
import {Box} from "@material-ui/core";
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    position: "relative",
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function StartGame() {
 const classes = useStyles();
  return (
    <div className={classes.root}>
      <CloseButton />
      <Box>
        <Button className={classes.button}
                variant={'contained'}
                color={'primary'}>Game must go on...
        </Button>
        <p> Click on button please...</p>
      </Box>
    </div>
  )
}

