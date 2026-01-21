import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Premium Color Palette
const primaryColor = '#3b82f6'; // Bright, trustworthy blue (Tailwind blue-500 equivalent)
const secondaryColor = '#8b5cf6'; // Modern purple (Tailwind violet-500)
const backgroundColor = '#f3f4f6'; // Cool gray background
const paperColor = '#ffffff';

let theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    background: {
      default: backgroundColor,
      paper: paperColor,
    },
    text: {
      primary: '#111827', // Gray 900
      secondary: '#6b7280', // Gray 500
    },
    action: {
      hover: 'rgba(59, 130, 246, 0.08)',
      selected: 'rgba(59, 130, 246, 0.12)',
    },
    divider: 'rgba(229, 231, 235, 1)', // Gray 200
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em', color: '#111827' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', color: '#111827' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em', color: '#1f2937' },
    h4: { fontWeight: 600, letterSpacing: '-0.015em', color: '#1f2937' },
    h5: { fontWeight: 600, color: '#374151' },
    h6: { fontWeight: 600, color: '#374151' },
    subtitle1: { fontSize: '1rem', fontWeight: 500, color: '#4b5563' },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' },
    body1: { fontSize: '1rem', lineHeight: 1.6, color: '#374151' },
    body2: { fontSize: '0.875rem', lineHeight: 1.6, color: '#4b5563' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)', // Soft shadow
    '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.1)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // ... fill the rest with standard MUI shadows or repeat custom ones if lazy, but for quality let's keep it safe. 
    // Actually, MUI expects 25 shadows. Let's just override the first few we use and let the rest be default or duplicates to avoid errors if I don't provide all 25.
    // For safety in this tool, I'll rely on the default array but override using styleOverrides where possible, or just provide a generated array.
    // To be safe and simple, I will use `createTheme`'s default shadows and just modify components. Refined strategy:
    ...Array(19).fill('none') // placeholders
  ] as any, // casting to avoid rigorous type check on length here, but actually better to use `shadows: createTheme({}).shadows` pattern if we want to modify. 
  // BETTER APPROACH: Let's not manually overwrite the whole shadows array easily without all 25 strings.
  // Instead, I'll use component overrides for elevation effects.
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth', height: '100%' },
        body: {
          height: '100%',
          backgroundColor: backgroundColor,
          fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '6px', height: '6px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '10px',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' },
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
          background: `linear-gradient(135deg, ${primaryColor}, #2563eb)`,
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
          '&:hover': {
            boxShadow: '0 6px 10px -1px rgba(59, 130, 246, 0.6)',
          },
        },
        sizeLarge: { padding: '10px 24px', fontSize: '1rem' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid rgba(229, 231, 235, 0.5)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          border: '1px solid rgba(229, 231, 235, 0.5)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
        },
        rounded: { borderRadius: 16 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(229, 231, 235, 0.6)',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(229, 231, 235, 1)', // Gray 200
            transition: 'border-color 0.2s ease-in-out',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9ca3af', // Gray 400
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryColor,
            borderWidth: 2,
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(243, 244, 246, 1)',
          color: '#1f2937',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(243, 244, 246, 1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '10px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: primaryColor,
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
            },
            '& .MuiListItemIcon-root': {
              color: primaryColor,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(243, 244, 246, 1)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: '#9ca3af',
        },
      },
    },
  },
});

// Since we did a trick with shadows array, let's just restore default shadows but keep our specific changes?
// Actually simpler to just not define shadows array above and rely on component elevation overrides if I can.
// But I wrote it, let's fix the invalid array issue.
// I will just clone the default shadows first.

const defaultTheme = createTheme();
theme.shadows = [...defaultTheme.shadows] as any;
// Apply custom overrides for specific levels if needed
theme.shadows[1] = '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)';
theme.shadows[2] = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
theme.shadows[4] = '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)';

theme = responsiveFontSizes(theme);

export default theme;

