import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './HomePage.scss';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import background from './HomePageImg/homepagebg.png'

const useStyles = makeStyles({
  homePage: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: "url(" + background + ")"
  },
});

export default function HomePage() {
  const classes = useStyles();
  function handlePLayClick() {
    console.log('Play Button Clicked');
  }
  return (
    <Container className={classes.homePage}>
      <Link 
          component={RouterLink} 
          to="/wordcards">
      <Button variant='contained' color='primary' size='large' onClick={ handlePLayClick }>
        Let's Play RsLang
      </Button>
      </Link> 
    </Container>
  );
}
