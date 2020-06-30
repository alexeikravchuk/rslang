import React  from "react";
import {connect} from "react-redux";
import { withStyles, Card, Dialog, Container, Typography } from '@material-ui/core';
import Background from "../background/Background";
import {GameToolbar} from "../GameToolbar";
import {SavannahButton} from "../SavannahButton";
import {gameStarting} from "../../../../store/actions/savannahAction";
import GameSlider from "../GameSlider/GameSlider";
import './StartGame.scss'

const styles = {
  contentDialog: {
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText:{
    color: 'wheat',
    marginBottom: "1rem",
  },
  title: {
    zIndex: 2000,
    color: '#662246',
  },
  card:{
    marginTop: '3rem',
    zIndex: 2000,
    color: 'wheat',
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }
};

function StartGame(props) {
  const {classes} = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false)
    props.gameStarting();
  };
  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}>
        <Background />
          <GameToolbar title={'Welcome to savannah'} to={'/home'}/>
          <Container className={classes.contentDialog}>
            <Typography  variant={'h6'} className={classes.title}>
              Choose your skill:
            </Typography>
            <GameSlider />
            <SavannahButton title={'lets try...'} onClick={handleClose}/>
            <Card className={classes.card}>
              <Typography  variant={'subtitle1'} className={classes.title}>
                <p>Добро пожаловать в саванну - игру по изучению новых слов, и повторению изученных.</p>
                Желаем успехов...
              </Typography>
            </Card>
         </Container>
       </Dialog>
  )
}

const mapStateToProps = store => {
  const { savannahReducer } = store
  return { ...savannahReducer }
}

const mapDispatchToProps = dispatch => ({
  gameStarting: () => {
    dispatch(gameStarting())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StartGame))
