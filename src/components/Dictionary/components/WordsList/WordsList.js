import React, {Component} from 'react';
import {List, ListItem, ListItemText, Typography, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {getWordInfo} from '../../getWords';
import {requestWordInfo, requestWordInfoSuccess} from '../../../../store/actions/wordsAction';

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

  render() {
    const {wordsArray, classes} = this.props;
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
                        }}
              >
                <ListItemText
                  primary={<Typography variant='h6' align={'left'} color={'primary'}>{ele.word}</Typography>}
                />
              </ListItem>
            );
          })
        }
      </List>
    )
      ;
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWordInfo: (word) => {
    dispatch(requestWordInfo());
    getWordInfo(word)
      .then(json => dispatch(requestWordInfoSuccess(json)));
  },
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(WordsList));