import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Palette definitions
const lightPalette = {
  primary: {
    main: '#3b82f6', // Bright blue
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#8b5cf6', // Violet
    light: '#a78bfa',
    dark: '#7c3aed',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f3f4f6', // gray-100
    paper: '#ffffff',
  },
  text: {
    primary: '#111827', // gray-900
    secondary: '#6b7280', // gray-500
  },
  divider: 'rgba(229, 231, 235, 1)',
  action: {
    hover: 'rgba(59, 130, 246, 0.08)',
    selected: 'rgba(59, 130, 246, 0.12)',
  }
};

const darkPalette = {
  primary: {
    main: '#60a5fa', // lighter blue for dark mode
    light: '#93c5fd',
    dark: '#3b82f6',
    contrastText: '#000000',
  },
  secondary: {
    main: '#a78bfa',
    light: '#c4b5fd',
    dark: '#8b5cf6',
    contrastText: '#000000',
  },
  background: {
    default: '#111827', // gray-900
    paper: '#1f2937', // gray-800
  },
  text: {
    primary: '#f9fafb', // gray-50
    secondary: '#9ca3af', // gray-400
  },
  divider: 'rgba(75, 85, 99, 1)', // gray-600
  action: {
    hover: 'rgba(96, 165, 250, 0.08)',
    selected: 'rgba(96, 165, 250, 0.12)',
  }
};

export const getTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  const palette = isDark ? darkPalette : lightPalette;

  let theme = createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.025em', color: palette.text.primary },
      h2: { fontWeight: 700, letterSpacing: '-0.025em', color: palette.text.primary },
      h3: { fontWeight: 700, letterSpacing: '-0.025em', color: palette.text.primary },
      h4: { fontWeight: 600, letterSpacing: '-0.015em', color: palette.text.primary },
      h5: { fontWeight: 600, color: palette.text.primary },
      h6: { fontWeight: 600, color: palette.text.primary },
      subtitle1: { fontSize: '1rem', fontWeight: 500, color: palette.text.secondary },
      subtitle2: { fontSize: '0.875rem', fontWeight: 500, color: palette.text.secondary },
      body1: { fontSize: '1rem', lineHeight: 1.6, color: palette.text.primary },
      body2: { fontSize: '0.875rem', lineHeight: 1.6, color: palette.text.secondary },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth', height: '100%' },
          body: {
            height: '100%',
            backgroundColor: palette.background.default,
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: '6px', height: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '10px',
              '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' },
            },
          },
          '#root': { height: '100%' },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { transform: 'translateY(-1px)' },
          },
          containedPrimary: {
            // Let MUI handle standard contained primary with palette, just adding shadow
            boxShadow: isDark ? '0 4px 6px -1px rgba(96, 165, 250, 0.3)' : '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
            '&:hover': {
              boxShadow: isDark ? '0 6px 10px -1px rgba(96, 165, 250, 0.4)' : '0 6px 10px -1px rgba(59, 130, 246, 0.6)',
            }
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(229, 231, 235, 0.5)',
            boxShadow: isDark ? 'none' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${palette.divider}`,
            color: palette.text.primary,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background.paper,
            borderRight: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.divider,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.text.secondary,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.Mui-selected': {
              backgroundColor: palette.action.selected,
              color: palette.primary.main,
              '& .MuiListItemIcon-root': {
                color: palette.primary.main,
              }
            }
          }
        }
      }
    },
  });

  return responsiveFontSizes(theme);
};

// Default export for backward compatibility if needed, though we should switch to named export.
// For now, let's export default a light theme to avoid breaking imports immediately, but we will update main.tsx
export default getTheme('light');

