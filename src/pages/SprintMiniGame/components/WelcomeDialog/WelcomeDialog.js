import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export function WelcomeDialog() {
  const [state, setState] = React.useState({
    useUsersWords: false,
    open: true,
    disabled: false,
  });

  const handleClose = () => {
    setState({ ...state, open: !state.open });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      disabled: !state.disabled,
     });
  };

  return (
    <div>
      <Dialog
       onClose={handleClose}
       fullWidth="true"
       maxWidth="sm"
       open={state.open}>
        <MuiDialogTitle>
          <Typography variant="h4">RS Sprint</Typography>
        </MuiDialogTitle>
        <DialogContent dividers>
        <Typography id="discrete-slider" gutterBottom>
          Choose your difficulty level, please
        </Typography>
        <Slider
          defaultValue={2}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={6}
          disabled={state.disabled}
        />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={<Checkbox checked={state.useUsersWords} onChange={handleChange} name="useUsersWords" />}
            label="Use my dictionary"
          />
          <Button autoFocus onClick={handleClose} color="primary">
            Start game!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
