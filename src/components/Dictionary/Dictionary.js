import React from 'react';
import {URL} from './constants';
import {getWords} from './getWords.js';
import Pagination from '@material-ui/lab/Pagination';
import {RecordVoiceOver} from '@material-ui/icons';
import {
  ListItemText,
  withStyles,
  ListItem,
  Grid,
  List,
  Typography,
  Divider,
  Tooltip,
  ListItemIcon,
} from '@material-ui/core';
import './Dictionary.scss';

const styles = theme => ({
  titleDictionary: {
    color: 'primary',
  },
  listDictionary: {
    overflow: 'auto',
    maxHeight: '50vh',
    maxWidth: '70%',
    [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
      maxWidth: '100%',
      maxHeight: '30vh',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(1,1,1,1)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.audio = null;
    this.state = {
      content: 'Page NOT LOADED',
      category: 0,
      count: 0,
      pageLoaded: true,
    };
  }

  handleCategoryChange(event, value) {
    this.setState(() => (
      {category: value - 1, count: 0}
    ), () => this.handleCategory(this.state.category));
  }

  handleCountChange(event, value) {
    this.setState(() => ({count: value - 1}), () => this.handleMoreWords());
  }

  componentDidMount() {
    this.handleCategory(this.state.category);
  }

  playAudioWords(path) {
    let audio = new Audio(path);
    let audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise.then(_ => {
        audio.pause();
      })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getNextWords = (data) => {
    let words = [];
    let audios = [];
    data.forEach(item => {
      audios.push(item.audio);
    });
    words = data.map((el, index) => {
      return (
        <ListItem key={index}
                  button
                  alignItems={'center'}
                  onClick={() => {
                    this.playAudioWords(`${URL}${audios[index]}`);
                  }}
        >
          <ListItemIcon>
            <RecordVoiceOver/>
          </ListItemIcon>
          <Tooltip title={<Typography
            variant='h6'
            align={'left'}
            color={'white'}>{el.transcription}</Typography>}
                   placement='top'>
            <ListItemText
              primary={<Typography variant='h6' align={'left'} color={'primary'}>{el.word}</Typography>}
            />
          </Tooltip>
          <ListItemText
            primary={<Typography variant='h6' align={'right'} color={'textPrimary'}>{el.wordTranslate}</Typography>}
          />
        </ListItem>
      );
    });
    this.setState({content: words});
  };

  handleCategory = (categoryNumber) => {
    getWords(0, categoryNumber).then((data) => {
      this.getNextWords(data, categoryNumber);
    });
  };

  handleMoreWords = () => {
    this.setState({pageLoaded: true});
    getWords(this.state.count, this.state.category).then((data) => {
      this.setState({pageLoaded: true});
      this.getNextWords(data, this.state.count);
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container
            className={'dictionaryRoot'}
            align='center'
            justify='center'
            alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h4'
                      component='h2'
                      align={'center'}
                      color='primary'>
            Dictionary
          </Typography>
        </Grid>
        <Grid item>
          <p><i>Category: </i></p>
          <Pagination count={6}
                      size='medium'
                      color='primary'
                      hidePrevButton
                      hideNextButton
                      onChange={this.handleCategoryChange.bind(this)}/>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
          <List className={classes.listDictionary}
                dense={true}
          >{this.state.content}</List>
          <Divider/>
        </Grid>
        <Grid item align='center'>
          {this.state.pageLoaded && <Pagination count={30}
                                                size='medium'
                                                onChange={this.handleCountChange.bind(this)}/>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dictionary);
