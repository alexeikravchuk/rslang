import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {SavannahButton} from "../SavannahButton";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

const styles = {
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh'
  },
}

class TrainWord extends Component{
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <SavannahButton title={this.props.currentWord} />
      </Container>
    )
  }

}



export default withStyles(styles)(TrainWord)