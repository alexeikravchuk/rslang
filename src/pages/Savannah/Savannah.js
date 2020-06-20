import React  from "react";
import { Container } from '@material-ui/core';
import Background from "./components/background/Background";
import StartGame from './components/StartGame/StartGame'
import './Savannah.scss'

function Savannah () {
  return (
    <div>
      <Background />
      <Container>
          <StartGame />
      </Container>
    </div>
  )
}

export default Savannah;