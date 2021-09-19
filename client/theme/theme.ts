import { createTheme } from '@mui/material';
import { deepOrange, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: deepOrange,
    secondary: indigo,
  },
  typography: {
    fontFamily: 'Poppins, Verdana, Arial, san-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 24,
  },
});

export default theme;
