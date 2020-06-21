import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {CloseButton} from "../closeButton";

const styles = {
  toolBar:{
    position: "relative",
    textAlign: "center",
    color: "#662246",
    zIndex: 10,
  },
  title: {
    flexGrow: 1,
  }
}

function GameToolbar(props){
  const { classes } = props;
  return (
    <Toolbar className={classes.toolBar}>
      <Typography variant={'h4'} className={classes.title}>
        {props.title}
      </Typography>
      <CloseButton />
    </Toolbar>
  )
}

export default withStyles(styles)(GameToolbar)
