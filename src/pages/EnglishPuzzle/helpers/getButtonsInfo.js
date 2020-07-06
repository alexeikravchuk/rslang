import React from 'react';
import { ContactSupport, CheckCircle, Forward, InsertChart } from '@material-ui/icons';

const getButtonsInfo = () => {
  return [
    { title: "I don't know", icon: <ContactSupport /> },
    { title: 'Check', icon: <CheckCircle /> },
    { title: 'Continue', icon: <Forward /> },
    { title: 'Results', icon: <InsertChart /> },
  ];
};

export { getButtonsInfo };
