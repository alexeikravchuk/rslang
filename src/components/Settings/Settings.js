import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, setSettings, handleChangeStore } from '../../store/actions/appSettingsAction';
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  TextField,
  Button,
} from '@material-ui/core';
import Img from './SettingsImg/bg.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link as RouterLink } from 'react-router-dom';

const styles = {
  mainContainer: {
    backgroundImage: `url(${Img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    backgroundColor: '#ffffff96',
    padding: '10px',
    borderRadius: '10px',
    userSelect: 'none',
  },
  textField: {
    marginTop: '10px',
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);

    const { dispatch, userId, token } = this.props;
    dispatch(getSettings(userId, token));

    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSave() {
    const { optional, wordsPerDay } = this.props.data;
    const { userId, token } = this.props;
    this.props.dispatch(setSettings({ optional, wordsPerDay }, userId, token));
  }

  handleChange(event) {
    let name = undefined,
      value = undefined;
    if (event.target.id) {
      name = event.target.id;
      value = event.target.value;
    } else {
      name = event.target.name;
      value = event.target.checked;
    }
    this.props.dispatch(handleChangeStore(name, value));
  }

  render() {
    const { loading, data } = this.props;

    if (loading) {
      return (
        <Container maxWidth={false} disableGutters={true} style={styles.mainContainer}>
          <Typography color={'secondary'} variant={'h4'}>
            Loading..
            <div>
              <LinearProgress color='secondary' />
            </div>
          </Typography>
        </Container>
      );
    }
    if (data.id || data.wordsPerDay) {
      return (
        <Container maxWidth={false} disableGutters={true} style={styles.mainContainer}>
          <Typography color={'primary'} variant={'h3'}>
            <FormGroup style={styles.formGroup}>
              User Settings:
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.optional.translate}
                    onChange={this.handleChange}
                    name='translate'
                    color='primary'
                  />
                }
                label='Show word translate'
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.optional.description}
                    onChange={this.handleChange}
                    name='description'
                    color='primary'
                  />
                }
                label='Show word description'
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.optional.example}
                    onChange={this.handleChange}
                    name='example'
                    color='primary'
                  />
                }
                label='Show word example'
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.optional.transcription}
                    onChange={this.handleChange}
                    name='transcription'
                    color='primary'
                  />
                }
                label='Show word transcription'
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.optional.image}
                    onChange={this.handleChange}
                    name='image'
                    color='primary'
                  />
                }
                label='Show word image'
              />
              <TextField
                style={styles.textField}
                id='newWords'
                label='New Words per Day'
                type='number'
                defaultValue={data.optional.newWords}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
              <TextField
                style={styles.textField}
                id='allWords'
                label='All Words per Day'
                type='number'
                defaultValue={data.wordsPerDay}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
              <Button
                color='primary'
                variant='contained'
                style={styles.textField}
                onClick={this.onSave}>
                Save Settings
              </Button>
              <Button
                component={RouterLink}
                to='/home'
                color='primary'
                variant='contained'
                style={styles.textField}
              >
                Close Settings &#10006;
              </Button>
            </FormGroup>
          </Typography>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { appStateReducer, authReducer } = state;
  return {
    loading: appStateReducer.loading,
    data: appStateReducer.data,
    error: appStateReducer.error,
    userId: authReducer.userId,
    token: authReducer.token,
  };
};

export default connect(mapStateToProps)(Settings);
