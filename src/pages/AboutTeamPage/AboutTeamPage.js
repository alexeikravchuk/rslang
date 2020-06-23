import React from 'react';
import { TeamCardsList } from './components/index'
import teamCards from './teamCards.json'

function AboutTeamPage() {
  return (
    <TeamCardsList teamCards={teamCards} />
  );
}

export { AboutTeamPage }
