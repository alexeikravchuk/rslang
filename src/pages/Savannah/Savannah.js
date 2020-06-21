import React  from "react";
import {MainGame} from './components/MainGame'
import { StartGame } from './components/StartGame'
import { Statistics } from "./components/Statistics";
import './Savannah.scss'

function Savannah () {
  return (
    <div>
      <StartGame />
      <MainGame />
      <Statistics />

    </div>
  )
}

export default Savannah;