import React from 'react';
import './App.scss';
import SignUp from './components/Registration/SignUp.js'
import SignIn from './components/Registration/SignIn.js'

function App() {
  return (
    <div className='App'>
      <SignIn />
      <SignUp />
    </div>
  );
}

export default App;
