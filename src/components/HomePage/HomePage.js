import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './HomePage.scss';

const useStyles = makeStyles({
  homePage: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function HomePage() {
  const classes = useStyles();
  function handlePLayClick() {
    console.log('Play Button Clicked');
  }
  return (
    <Container className={classes.homePage}>
      <Button variant='contained' color='primary' size='large' onClick={ handlePLayClick }>
        Let's Play RsLang
      </Button>
    </Container>
  );
}
export default HomePage;