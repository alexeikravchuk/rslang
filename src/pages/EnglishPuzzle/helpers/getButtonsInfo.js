import React from 'react';
import {
  ContactSupport,
  CheckCircle,
  Forward,
  InsertChart,
  History,
  Replay,
} from '@material-ui/icons';
import { BUTTONS_NAME } from '../constants/constants';

const buttonsInfo = [
  { title: "I don't know", icon: <ContactSupport /> },
  { title: 'Check', icon: <CheckCircle /> },
  { title: 'Continue', icon: <Forward /> },
  { title: 'Results', icon: <InsertChart /> },
  { title: 'Statistics', icon: <History /> },
  { title: 'Try again', icon: <Replay /> },
];

const getButtonsInfo = (buttonNames) => {
  return buttonNames
    ? buttonNames.map((name) => {
        if (name === BUTTONS_NAME.DONT_KNOW) {
          return buttonsInfo[0];
        }
        if (name === BUTTONS_NAME.CHECK) {
          return buttonsInfo[1];
        }
        if (name === BUTTONS_NAME.CONTINUE) {
          return buttonsInfo[2];
        }
        if (name === BUTTONS_NAME.RESULTS) {
          return buttonsInfo[3];
        }
        if (name === BUTTONS_NAME.STATISTICS) {
          return buttonsInfo[4];
        }
        if (name === BUTTONS_NAME.TRY_AGAIN) {
          return buttonsInfo[5];
        }
        return null;
      })
    : buttonsInfo;
};

export { getButtonsInfo };
