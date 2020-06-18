import React from 'react'
import { TeamCard } from '../TeamCard/index'
import './TeamCardsList.scss'

function TeamCardsList(props) {
  return (
    <div className='card-container'>
      { props.teamCards.map((card) => <TeamCard card={ card } key={ card.id } />) }
    </div>
  );
}

export { TeamCardsList }
