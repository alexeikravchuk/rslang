import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './HomePage.scss';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import background from './HomePageImg/homepagebg.png'

const useStyles = makeStyles({
  homePage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: "center no-repeat url(" + background + ")",
    backgroundSize: 'cover',
  },
});

export default function HomePage() {
  const classes = useStyles();
  function handlePLayClick() {
    console.log('Play Button Clicked');
  }
  return (
    <div className={classes.homePage}>
      <Link 
          component={RouterLink} 
          to="/choosegame">
      <Button variant='contained' color='primary' size='large' onClick={ handlePLayClick }>
        Let's Play RsLang
      </Button>
      </Link> 
    </div>
  );
}
