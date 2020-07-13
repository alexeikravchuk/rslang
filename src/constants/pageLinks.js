import {
  Home,
  MenuBook,
  Timeline,
  RecordVoiceOver,
  Extension,
  Pets,
  Hearing,
  DirectionsRun,
  People,
  Slideshow,
  VideoLabel,
  Settings,
} from '@material-ui/icons';
import React from 'react';

export const pageLinks = [
  {
    title: 'Main page',
    link: '/home',
    icon: <Home color='primary' />,
    type: 'primary',
  },
  {
    title: 'Vocabulary',
    link: '/dictionary',
    icon: <MenuBook color='primary' />,
    type: 'primary',
  },
  {
    title: 'Statistics',
    link: '/statistics',
    icon: <Timeline color='primary' />,
    type: 'primary',
  },
  {
    title: 'SpeakIt',
    link: '/speakit',
    icon: <RecordVoiceOver color='secondary' />,
    type: 'game',
  },
  {
    title: 'English puzzle',
    link: '/puzzle',
    icon: <Extension color='secondary' />,
    type: 'game',
  },
  {
    title: 'Savannah',
    link: './savannah',
    icon: <Pets color='secondary' />,
    type: 'game',
  },
  {
    title: 'Audio call',
    link: '/audiocall',
    icon: <Hearing color='secondary' />,
    type: 'game',
  },
  {
    title: 'Sprint',
    link: '/sprint',
    icon: <DirectionsRun color='secondary' />,
    type: 'game',
  },
  {
    title: 'ownGame',
    link: 'ownGame',
    icon: <VideoLabel color='secondary' />,
    type: 'game',
  },
  {
    title: 'About us',
    link: './about',
    icon: <People />,
    type: 'addition',
  },
  {
    title: 'Promo page',
    link: '/promo',
    icon: <Slideshow />,
    type: 'addition',
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: <Settings />,
    type: 'addition',
  },
];
