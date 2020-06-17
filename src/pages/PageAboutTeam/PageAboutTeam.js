import React from 'react';
import TeamCardsList from './components/TeamCardsList/index'
import teamCards from './teamCards.json'

export default function AboutTeam() {
  return (
    <TeamCardsList teamCards={teamCards} />
  );
}
