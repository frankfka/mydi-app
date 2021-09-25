import React, { createContext, useContext, useState } from 'react';
import { SnackbarState } from './GlobalViewContextTypes';
import { Alert, Snackbar } from '@mui/material';

type GlobalViewContextState = {
  showSnackbar(params: SnackbarState): void;
};

export const GlobalViewContext = createContext<GlobalViewContextState>(
  {} as unknown as GlobalViewContextState
);

export const GlobalViewContextProvider: React.FC = ({ children }) => {
  // Global snackbar state
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarState>();
  const closeSnackbar = () => {
    setShowSnackbar(false);
    // Don't clear the snackbar state to get a nice fade animation
  };

  const contextState: GlobalViewContextState = {
    showSnackbar(params) {
      setShowSnackbar(true);
      setSnackbarState(params);
    },
  };

  return (
    <GlobalViewContext.Provider value={contextState}>
      {/*Snackbar*/}
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState?.type}
          sx={{ width: '100%' }}
        >
          {snackbarState?.message}
        </Alert>
      </Snackbar>

      {/*Content*/}
      {children}
    </GlobalViewContext.Provider>
  );
};

export const useGlobalViewContext = () => {
  return useContext(GlobalViewContext);
};
