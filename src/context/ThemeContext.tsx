
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme/muiTheme';

interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const savedMode = localStorage.getItem('themeMode');
        return (savedMode === 'light' || savedMode === 'dark') ? savedMode : 'light';
    });

    const toggleTheme = () => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    const theme = getTheme(mode);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
