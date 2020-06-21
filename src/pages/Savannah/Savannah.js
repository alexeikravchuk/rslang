import React  from "react";
import { Container } from '@material-ui/core';
import Background from "./components/background/Background";
import { StartGame} from './components/StartGame'
import { Statistics } from "./components/Statistics";
import './Savannah.scss'

function Savannah () {
  return (
    <div>
      <Background />
      <StartGame />
    </div>
  )
}

export default Savannah;