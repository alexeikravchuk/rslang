import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrimaryAppBar from './components/AppBar/AppBar';

function App() {
  return (
    <Router>
      <Route path='/'><PrimaryAppBar/></Route> 
    </Router>
  );
}

export default App;
