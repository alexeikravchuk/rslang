import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import './TrainWord.scss'
import Typography from "@material-ui/core/Typography";
import {DATA_LINK} from "../../../SpeakIt/constants/constants";

const styles = theme => ({
  root:{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '60vh'
  },
  title:{
    ...theme.typography.button,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(106, 35, 72, .3)',
    color:'#662246',
    padding: '1rem 3rem',
  }
});

class TrainWord extends Component{
  playSound(word){
    let audio = null;
    const audioSrc = DATA_LINK + word.audio;
    try {
      audio = new Audio(audioSrc);
      audio.play().then(r =>{});
    } catch (e) {
      console.log(e.message);
    }
  }
  componentDidMount() {
    console.log(this.props.currentWord)
    this.playSound(this.props.currentWord)

  }
  componentWillUnmount() {
    console.log('good bye')
  }

  render() {
    const { classes } = this.props;
    return (
      <div onAnimationStart={this.props.onAnimationStart}
           onAnimationEnd={this.props.onAnimationEnd}
           className={'animate'}>
        <Container className={classes.root}>
          <Typography  variant={'h6'} className={classes.title}>
            {this.props.currentWord.word}
          </Typography>
        </Container>
      </div>
    )
  }
}



export default withStyles(styles)(TrainWord)
