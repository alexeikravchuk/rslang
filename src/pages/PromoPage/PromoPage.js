import React from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Container,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Background from './PromoPageImages/PromoBg.png';
import firstImage from './PromoPageImages/1.jpg';
import secondImage from './PromoPageImages/2.jpg';
import VideogameAssetOutlinedIcon from '@material-ui/icons/VideogameAssetOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    backgroundImage: "url(" + Background + ")",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  image: {
    maxWidth: '400px',
  },
  green: {
    color: '#73ff77',
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
  englishEasy: {
    textAlign: 'center',
  },
  playNowLink: {
    color: '#ff0000',
    fontSize: '26px',
    backgroundColor: '#faffe9',
    borderRadius: '5px',
    border: '2px solid #73ff77',
    padding: '5px',
  },
  paper: {
    width: 'min-content',
    margin: '0 auto',
  },
});

export const PromoPage = () => {
  const classes = useStyles();
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.container}
    >
      <Grid
        container
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item lg={4} md='auto' sm='auto' xs='auto'
        >
          <div className={classes.englishEasy}>
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
              <p>
                What are you waiting for?
            </p>
              <Link
                component={RouterLink}
                to="/choosegame"
                className={classes.playNowLink}
              >
                Play Now
            </Link>
            </Typography>
          </div>
        </Grid>
        <Grid
          item lg={5} md='auto' sm='auto' xs='auto'
        >
          <Paper
            elevation={2}
            className={classes.paper}
          >
            <img
              src={firstImage}
              alt='first'
              className={classes.image}
            />
          </Paper>
        </Grid>

        <Grid
          item lg={5} md='auto' sm='auto' xs='auto'
        >
          <Typography
            color='secondary'
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar>
                    <VideogameAssetOutlinedIcon className={classes.green} fontSize='large' />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary='GAMES' secondary='Play different games to show your skill'/>
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
        </Grid>
        <Grid
          item lg={5} md='auto' sm='auto' xs='auto'
        >
          <Paper
            elevation={3}
            className={classes.paper}
          >
            <img
              src={secondImage}
              alt='second'
              className={classes.image}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}