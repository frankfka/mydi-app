import { createTheme, PaletteMode } from '@mui/material';
import { blueGrey, deepOrange } from '@mui/material/colors';

const getAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: blueGrey,
      secondary: deepOrange,
    },
    typography: {
      fontFamily: 'Roboto Mono, monospace',
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 24,
    },
  });
};

export default getAppTheme;
