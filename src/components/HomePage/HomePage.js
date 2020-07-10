import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Img from './HomePageImg/homepagebg.png';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles({
  homePage: {
    backgroundImage: `url(${Img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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
    <Container className={classes.homePage }>
      <Button component={RouterLink} to="/wordcards" variant='contained' color='primary' size='large' onClick={handlePLayClick}>
        Let's Play RsLang
      </Button>
    </Container>
  );
}
export { HomePage };
