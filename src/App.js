import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrimaryAppBar from './components/AppBar/AppBar';
import SignIn from './components/Registration/SignIn';
import SignUp from './components/Registration/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/'>
         <PrimaryAppBar/>
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
