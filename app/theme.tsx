'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useState, useMemo, ReactNode, useEffect } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      return savedMode === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#ffab00',
                  light: '#ffd740',
                  dark: '#c67c00',
                  contrastText: '#000000',
                },
                secondary: {
                  main: '#ff6f00',
                  light: '#ffa040',
                  dark: '#c43e00',
                  contrastText: '#ffffff',
                },
                background: {
                  default: '#fff8e1',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#212121',
                  secondary: '#757575',
                },
              }
            : {
                primary: {
                  main: '#ffd740',
                  light: '#ffff74',
                  dark: '#c8a600',
                  contrastText: '#000000',
                },
                secondary: {
                  main: '#ffa040',
                  light: '#ffd170',
                  dark: '#c67100',
                  contrastText: '#000000',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#e0e0e0',
                  secondary: '#b0b0b0',
                },
              }),
        },
        typography: {
          fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit',
              }),
            },
          },
          MuiListItemText: {
            styleOverrides: {
              primary: ({ theme }) => ({
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit',
              }),
              secondary: ({ theme }) => ({
                color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'inherit',
              }),
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeWrapper;