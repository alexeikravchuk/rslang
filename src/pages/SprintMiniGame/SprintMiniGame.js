import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, Score, GameCard, WelcomeDialog } from './components/index';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url(/images/backgrounds/SprintMiniGameBackground.jpg) center no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
  },
  volume: {
    width: '50px',
    height: '50px',
  }
});

function SprintMiniGame(props) {
  const classes = useStyles();

  if (props.sprintState.showCard) {
    return (
      <div className={classes.container}>
        <Timer />
        <Score />
        <GameCard />
        <IconButton>
          <VolumeUpIcon style={{ fontSize: 60 }} />
        </IconButton>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <WelcomeDialog />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//   }
// }


export default connect(mapStateToProps, null)(SprintMiniGame)
