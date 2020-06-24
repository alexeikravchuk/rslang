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


const styles = {
  contentDialog: {
    zIndex: 10,
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
        onClose={handleClose}>
          <GameToolbar title={'Savannah game'} />
          <Background />
          <Container className={classes.contentDialog}>
            <GameSlider />
            <SavannahButton title={'lets begin'} onClick={handleClose}/>
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