import React, {Component} from 'react';
import {List, ListItem, ListItemText, Typography, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {getWordInfo} from '../../getWords';
import {
  deleteWord,
  recoverFromDeleted, recoverFromHard,
  requestWordInfo,
  requestWordInfoSuccess, resetCurrent,
  setHardWord,
} from '../../../../store/actions/wordsAction';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const styles = theme => ({
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
});

class WordsList extends Component {

  handleClick(word) {
    this.props.fetchWordInfo(word);
  }

  handleDelete(wordID) {
    this.props.replaceToDelete(wordID);
  }

  handleRestore(wordID) {
    this.props.restoreToLearning(wordID);
  }

  handleRestoreHard(wordID) {
    this.props.replaceFromHard(wordID);
  }

  handleHard(wordID) {
    this.props.replaceToHard(wordID);
  }

  componentDidMount() {
    const {pageType, fetchWordInfo, wordsArray} = this.props;
    if ((pageType === 'learning' || pageType === 'hard') && (wordsArray.length !== 0)) {
      fetchWordInfo(wordsArray[0].id);
    }
  }

  componentWillUnmount() {
    this.props.onReset();
  }

  render() {
    const {wordsArray, classes, pageType} = this.props;
    return (
      <List className={classes.listDictionary}
            dense={true}
      >
        {
          wordsArray.map((ele) => {
            return (
              <ListItem key={ele.id}
                        button
                        word={ele}
                        alignItems={'center'}
                        onClick={() => {
                          this.handleClick(ele.id);
                        }}>
                <ListItemText
                  primary={<Typography variant='h6' align={'left'} color={'primary'}>{ele.word}</Typography>}
                />


                {(pageType === 'learning') && <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => {
                    this.handleHard(ele.id);
                  }}>
                    <FitnessCenterIcon/>
                  </IconButton>
                  <IconButton edge="end" onClick={() => {
                    this.handleDelete(ele.id);
                  }}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>}
                {(pageType === 'hard') && <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => {
                    this.handleRestoreHard(ele.id);
                  }}>
                    <RestorePageIcon/>
                  </IconButton>
                </ListItemSecondaryAction>}

                {(pageType === 'restore') && <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => {
                    this.handleRestore(ele.id);
                  }}>
                    <RestoreFromTrashIcon/>
                  </IconButton>
                </ListItemSecondaryAction>}
              </ListItem>
            );
          })
        }
      </List>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWordInfo: (word) => {
    dispatch(requestWordInfo());
    getWordInfo(word)
      .then(json => dispatch(requestWordInfoSuccess(json)));
  },
  replaceToHard: (wordId) => {
    dispatch(setHardWord(wordId));
  },
  replaceToDelete: (wordId) => {
    dispatch(deleteWord(wordId));
  },
  restoreToLearning: (wordId) => {
    dispatch(recoverFromDeleted(wordId));
  },
  replaceFromHard: (wordId) => {
    dispatch(recoverFromHard(wordId));
  },
  onReset: () => {
    dispatch(resetCurrent());
  },
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(WordsList));