import React from 'react';
import SignIn from '../components/Registration/SignIn';
import SignUp from '../components/Registration/SignUp';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrimaryAppBar from '../components/AppBar/AppBar';
import AboutTeamPage from '../pages/AboutTeamPage/AboutTeamPage';

function Routes() {

  function ModalSwitch(){
    return(
      <Switch>
        <Route exact path='/' component={AppStart}>
        </Route>
        <Route path='/signin' component={SignIn}>
        </Route>
        <Route path='/signup' component={SignUp}>
        </Route>
        <Route path='/main' component={PrimaryAppBar}>
        </Route>
        <Route path='/aboutteampage' component={AboutTeamPage}>
        </Route>
    </Switch>
    )
  }

  function AppStart(){
    return(
      <SignIn
        />
    )
  }

  return (
    <BrowserRouter>
        <ModalSwitch />
    </BrowserRouter>
  );
}

export default Routes;


    //
    //   <Box
    //     display="flex" 
    //     flexDirection="row-reverse"
    //   >
    //     <ButtonGroup 
    //       disableElevation 
    //       variant="contained" 
    //       color="primary"
    //       >
    //         <Button>
    //           <Link 
    //             to='./signin'
    //             style={{ 
    //               textDecoration: 'none', 
    //               color: 'white'
    //             }}
    //           >Sign In</Link>
    //         </Button>
    //         <Button>
    //           <Link 
    //             to='./signup'
    //             style={{ 
    //               textDecoration: 'none', 
    //               color: 'white'
    //             }} 
    //           >Sign Up</Link>
    //           </Button>
    //     </ButtonGroup>
      // </Box>