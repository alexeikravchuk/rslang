import React from 'react';
import {BrowserRouter, Link,Switch, Route} from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import SignIn from '../components/Registration/SignIn';
import SignUp from '../components/Registration/SignUp';
import PrimaryAppBar from '../components/AppBar/AppBar';

function Routes() {
  return (
    <BrowserRouter>
        <div><Link to='/home'>Home</Link></div>
        {/* <div><Link to='/signin'>Sign In</Link></div>
        <div><Link to='/signup'>Sign Up</Link></div> */}
        <Switch>
          <Route exact path='/home'>
            <HomePage/>
          </Route>
          <Route path='/signin'>
            <SignIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/appbar'>
            <PrimaryAppBar/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;
