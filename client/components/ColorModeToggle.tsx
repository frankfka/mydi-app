import React from 'react';
import { useAppThemeContext } from '../contexts/views/AppThemeContext';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeToggle = () => {
  const theme = useTheme();
  const appThemeContext = useAppThemeContext();
  return (
    <IconButton onClick={appThemeContext.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ColorModeToggle;
