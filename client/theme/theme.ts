import { createTheme } from '@mui/material';

// TODO: address theming
const theme = createTheme({
  palette: {
    primary: {
      main: '#083BF1',
    },
    secondary: {
      main: '#FF4F5A',
    },
  },
  typography: {
    fontFamily: 'Poppins, Verdana, Arial',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 24,
  },
});

export default theme;
