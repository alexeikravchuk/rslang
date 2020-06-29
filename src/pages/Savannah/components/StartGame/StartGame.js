import React  from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import Background from "../background/Background";
import {GameToolbar} from "../GameToolbar";
import {SavannahButton} from "../SavannahButton";
import Container from "@material-ui/core/Container";
import {gameStarting} from "../../../../store/actions/savannahAction";
import {connect} from "react-redux";
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
    marginBottom: "1rem"
  },
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
        className={'root'}
        onClose={handleClose}>
        <Background />
          <GameToolbar title={'Welcome to savannah'} to={'/home'}/>
          <Container className={classes.contentDialog}>
            <GameSlider />
            <SavannahButton title={'lets try...'} onClick={handleClose}/>
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