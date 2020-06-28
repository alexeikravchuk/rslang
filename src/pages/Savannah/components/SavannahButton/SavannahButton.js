import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=> ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(106, 35, 72, .3)',
    color: 'wheat',
    height: 48,
    width: 200,
    margin: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
      <Button key={props.key} variant={'outlined'} className={classes.button} onClick={props.onClick}>
        {props.title}
      </Button>
    )
}