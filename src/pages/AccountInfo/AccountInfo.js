import React, { useState } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Button, TextField, Avatar } from '@material-ui/core'
import { connect } from 'react-redux';
import './AccountInfo.scss';
import noavatar from '../../assets/no_avatar.png';
import { 
  addFirstName,
  addLastName
  }  from '../../store/actions/authAction'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  }
}));

function AccountInfo(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newAvatar, changeAvatar] = useState(noavatar);
    


    function setPath(path){
        let newUrl = window.URL.createObjectURL(path);
        changeAvatar(newUrl);
    }

    function updateData(){
      props.dispatch(addFirstName(firstName))
      props.dispatch(addLastName(lastName))
     
    }

      return (
      <Container >
        <div className="account-block">
        <Box>
          <div className="image-upload">   
              <label htmlFor="load-avatar">
                  <Avatar alt='user-logo' src={newAvatar} className={classes.large}/>
              </label>
              <input id="load-avatar" type="file"  accept="image/*" onChange={(e)=> {
                console.log(e.target.files[0])
                setPath(e.target.files[0])
                }}  />
          </div>   
        </Box>
       
          <div className="field">
            <TextField
              id="outlined-helperText"
              label="Name"
              defaultValue={props.firstName}
              onInput={e => setFirstName(e.target.value)}
              variant="outlined"
            />
          </div>
          <div className="field">
            <TextField
              id="outlined-helperText"
              label="Last Name"
              defaultValue={props.lastName}
              onInput={e => setLastName(e.target.value)}
              variant="outlined"
            />
          </div>
          <div className="field">
            <TextField
              id="outlined-helperText"
              label="Email"
              value={props.email}
              variant="outlined"
            />
          </div>
          <div className={classes.root}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={updateData}
            >
              Update
            </Button>
          </div>
       </div>
      </Container>
      )
}

function mapState({ authReducer: { firstName, lastName, email } }) {
  return {
    firstName,
    lastName,
    email,
  };
}

export default connect(mapState)(AccountInfo);
