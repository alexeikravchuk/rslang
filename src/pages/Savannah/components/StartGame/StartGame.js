import React  from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Background from "../background/Background";
import {GameToolbar} from "../GameToolbar";
import {SavannahButton} from "../SavannahButton";
import Container from "@material-ui/core/Container";

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
  };
  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}>
          <GameToolbar title={'Savannah game'} />
          <Background />
          <Container className={classes.contentDialog}>
            <Typography variant={'h6'} className={classes.contentText}>
              Game must begin...
            </Typography>
           <SavannahButton title={'lets begin'} onClick={handleClose}/>
         </Container>
       </Dialog>

  )
}

export default withStyles(styles)(StartGame)