import React, { createContext, useContext, useMemo, useState } from 'react';
import getAppTheme from '../../theme/getAppTheme';
import { CssBaseline, PaletteMode, Theme, ThemeProvider } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../../theme/createEmotionCache';

type ColorModeContextState = {
  colorMode: PaletteMode;
  toggleColorMode(): void;
};
export type AppThemeContextProviderProps = {
  emotionCache?: EmotionCache;
};

export const AppThemeContext = createContext<ColorModeContextState>(
  {} as unknown as ColorModeContextState
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const AppThemeContextProvider: React.FC<AppThemeContextProviderProps> =
  ({ emotionCache, children }) => {
    const [colorMode, setColorMode] = useState<PaletteMode>('light');

    const contextState: ColorModeContextState = {
      colorMode,
      toggleColorMode() {
        setColorMode((mode) => (mode === 'light' ? 'dark' : 'light'));
      },
    };

    const theme: Theme = useMemo(() => getAppTheme(colorMode), [colorMode]);
    return (
      <AppThemeContext.Provider value={contextState}>
        <CacheProvider value={emotionCache ?? clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </AppThemeContext.Provider>
    );
  };

export const useAppThemeContext = () => {
  return useContext(AppThemeContext);
};
