import React from 'react';
import Link from '@material-ui/core/Link';
import {
  Avatar,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Background from './PromoPageImages/PromoBg.png';
import { imagesData } from './PromoPageImages/imagesData';
import VideogameAssetOutlinedIcon from '@material-ui/icons/VideogameAssetOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    backgroundImage: "url(" + Background + ")",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
  },
  image: {
    maxWidth: '400px',
    maxHeight: '300px',
  },
  green: {
    color: '#32a852',
  },
  blue: {
    color: '#08b1ff',
  },
  orange: {
    color: '#ffb508',
  },
  white: {
    color: '#ffffff',
  },
  mainTextBlock: {
    display: 'inline-block',
    textAlign: 'right',
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '15px',
  }
});

export const PromoPage = () => {
  const classes = useStyles();
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.container}
    >
      <div className={classes.mainTextBlock}>
        <Typography
          color='secondary'
          variant='h2'
        >
          ENGLISH IS <span className={classes.blue}>EASY</span>
        </Typography>
        <Typography
          color='primary'
          variant='h6'
        >
          All you need - is a little <strong className={classes.green}>effort!</strong>
        </Typography>
        <Typography
          color='primary'
          variant='h6'
        >
          Let's do it <strong className={classes.orange}>Together!</strong>
        </Typography>
      </div>
      <div className={classes.featuresBlock}>
        <Typography
          color='secondary'
          variant='h2'
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar>
                  <VideogameAssetOutlinedIcon className={classes.green} fontSize='large' />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary='GAMES' secondary='Play different games to show your skill' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar>
                  <MenuBookOutlinedIcon className={classes.white} fontSize='large' />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary='DICTIONARY' secondary='Improve your vocabulary' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar>
                  <EqualizerOutlinedIcon color='secondary' fontSize='large' />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary='STATS' secondary='Check your progress' />
            </ListItem>
          </List>
        </Typography>
      </div>
      <div className={classes.imagesContainer}>
        {imagesData.map((image) => (
          <Paper
            elevation={2}
          >
            <img
              src={image.img}
              alt={image.title}
              className={classes.image}
            />
          </Paper>
        ))}
      </div>

    </Container>
  )
}