import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#f44336',
    },
  },
  color: {
    primary: 'blue',
    secondary: '#00BCD4',
    error: '#E64A19',
    textColor: '#FFFFFF',
    menuLink: 'black',
    //defaultTextColor: '#3949ab',
    defaultTextColor: '#3949ab',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    backgroudColor: 'blue',
    color: 'white',
  },

  transitions: {
    duration: {
      shortest: 1000,
      shorter: 1000,
      short: 1000,
      standard: 100,
      complex: 1000,
      enteringScreen: 1000,
      leavingScreen: 1000
    }
  },
});

export default theme;
