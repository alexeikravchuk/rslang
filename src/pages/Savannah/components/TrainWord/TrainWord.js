import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {SavannahButton} from "../SavannahButton";
import './TrainWord.scss'
const styles = {
  root:{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '60vh'
  },
}

class TrainWord extends Component{
 componentDidMount() {
 }

 componentWillUnmount() {
 }

  render() {
    const { classes } = this.props;
    return (
      <div onAnimationStart={this.props.onAnimationStart}
           onAnimationEnd={this.props.onAnimationEnd}
           className={'animate'}>
        <Container className={classes.root}>
          <SavannahButton title={this.props.currentWord} />
        </Container>
      </div>
    )
  }
}



export default withStyles(styles)(TrainWord)