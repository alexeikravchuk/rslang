import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Toolbar, withStyles, Typography} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
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

function lifeCounterFunction(lifeCounter) {
  return Array(lifeCounter).fill(1).map(( el ,index) =>
    <FavoriteIcon key={index}/>
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
      <Link to={props.to} >
        <CloseButton onClick={props.onClose}/>
      </Link>
    </Toolbar>
  )
}

const mapStateToProps = (store) => {
  return { lifeCounter: store.savannahReducer.lifeCounter,
  gameStarted: store.savannahReducer.gameStarted}
}

export default connect(mapStateToProps)(withStyles(styles)(GameToolbar))
