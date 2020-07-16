import React from 'react';
import {URL} from './constants';
import {getWords} from './getWords.js';
import Pagination from '@material-ui/lab/Pagination';
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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  BottomNavigationAction,
  BottomNavigation,
} from '@material-ui/core';
import './Dictionary.scss';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DeleteIcon from '@material-ui/icons/Delete';
import {RecordVoiceOver, Storefront} from '@material-ui/icons';
import {connect} from 'react-redux';
import {WordsList} from './components';

const styles = theme => ({
  titleDictionary: {
    color: 'primary',
  },
  rootCard: {
    maxWidth: 320,
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
      navValue: 0,
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
    let audio = null;
    try {
      if (audio && audio.played) {
        audio.pause();
      }
      audio = new Audio(path);
      audio.play().catch((e) => console.log(e.message));
    } catch (e) {
      console.log(e.message);
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
          >{el.transcription}</Typography>}
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

  renderHTML(text) {
    return (
      <div dangerouslySetInnerHTML={{__html: text}}>
      </div>
    );
  }

  renderImage(data) {
    const image = new Image();
    image.src = `data:image/jpg;base64,${data}`;
    return image.src;
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container
            className={'dictionaryRoot'}
            align='center'
            justify='flex-start'
            alignItems='flex-start'>
        <Grid item xs={12}>
          <BottomNavigation
            value={this.state.navValue}
            onChange={(event, newValue) => {
              this.setState({navValue: newValue});
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction label="All collection" icon={<Storefront/>}/>
            <BottomNavigationAction label="Learned words" icon={<SpellcheckIcon/>}/>
            <BottomNavigationAction label="Hard words" icon={<FitnessCenterIcon/>}/>
            <BottomNavigationAction label="Deleted words" icon={<DeleteIcon/>}/>
          </BottomNavigation>
        </Grid>
        {(this.state.navValue > 0) && (this.state.navValue !== 3) && <Grid item xs={12}>
          <Card className={classes.rootCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={this.renderImage(this.props.currentWord.image)}
                title={this.props.currentWord.word}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {this.props.currentWord.word}
                </Typography>
                <Divider/>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${this.props.currentWord.transcription} - ${this.props.currentWord.wordTranslate}`}
                  {this.renderHTML(this.props.currentWord.textExample)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>}
        <Grid item xs={12}>
          {(this.state.navValue === 1) && <Grid container
                                                align='center'
                                                justify='center'
                                                alignItems='flex-start'
          >
            <Grid item xs={12}>
              <WordsList wordsArray={this.props.learnedWords}
                         pageType={'learning'}/>
            </Grid>
          </Grid>}
          {(this.state.navValue === 2) && <Grid container
                                                align='center'
                                                justify='center'
                                                alignItems='flex-start'
          >
            <Grid item xs={12}>
              <WordsList wordsArray={this.props.hardWords}
                         pageType={'hard'}/>
            </Grid>
          </Grid>}
          {(this.state.navValue === 3) && <Grid container
                                                align='center'
                                                justify='center'
                                                alignItems='flex-start'
          >
            <Grid item xs={12}>
              <WordsList wordsArray={this.props.deletedWords}
                         pageType={'restore'}/>
            </Grid>
          </Grid>}
          {(this.state.navValue === 0) && <Grid container
                                                align='center'
                                                justify='center'
                                                alignItems='center'>
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
          </Grid>}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = store => {
  const {wordsReducer} = store;
  return {...wordsReducer};
};

// const mapDispatchToProps = dispatch => {
//
// };

export default connect(mapStateToProps)(withStyles(styles)(Dictionary));
