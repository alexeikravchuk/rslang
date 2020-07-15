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
import { switchers, ALL_WORDS, NEW_WORDS } from './constants';
import Img from './SettingsImg/bg.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link as RouterLink } from 'react-router-dom';

const styles = {
  mainContainer: {
    backgroundImage: `url(${Img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100%',
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
      value = event.target.value <= 0 ? 1 : event.target.value;
    } else {
      name = event.target.name;
      value = event.target.checked;
    }
    this.props.dispatch(handleChangeStore(name, value));
  }

  render() {
    const { loading, data } = this.props;
    if (data.optional.newWords > data.wordsPerDay) {
      data.optional.newWords = data.wordsPerDay;
    }

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
              User Settings
              <Divider />
              {switchers.map((switcher) =>
                <React.Fragment key={switcher.name}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.optional[`${switcher.name}`]}
                        onChange={this.handleChange}
                        name={switcher.name}
                        color={switcher.color}
                      />
                    }
                    label={switcher.label}
                  />
                  <Divider />
                </React.Fragment>
              )}

              <TextField
                style={styles.textField}
                id='newWords'
                label={NEW_WORDS}
                type='number'
                inputProps={{min: "1"}}
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
                label={ALL_WORDS}
                type='number'
                inputProps={{min: "1"}}
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

const mapStateToProps = ({ appStateReducer, authReducer }) => {
  const { loading, data, error } = appStateReducer;
  const { userId, token } = authReducer;
  return { loading, data, error, userId, token };
};

export default connect(mapStateToProps)(Settings);
