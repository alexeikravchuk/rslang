import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from "@material-ui/core/styles";
import {CloseButton} from "../closeButton";
import {connect} from "react-redux";

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

function lifeCounterFunction(lifeCounter) {
  return Array(lifeCounter).fill(1).map(() =>
    <FavoriteIcon />
  )
}
function GameToolbar(props){
  const { classes } = props;
  return (
    <Toolbar className={classes.toolBar}>
      <Typography variant={'h4'} className={classes.title}>
        {props.title}
      </Typography>
      {props.gameStarted &&
        lifeCounterFunction(props.lifeCounter)
      }
      <CloseButton />
    </Toolbar>
  )
}

const mapStateToProps = (store) => {
  return { lifeCounter: store.savannahReducer.lifeCounter,
  gameStarted: store.savannahReducer.gameStarted}
}

export default connect(mapStateToProps)(withStyles(styles)(GameToolbar))
