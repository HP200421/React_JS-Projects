import { createContext, useContext } from 'react'

export const ThemeContext  = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
})
// This are the default values that we are passing while creating context
// We can pass variables as well as methods

export const ThemeProvider = ThemeContext.Provider

// Custom Hook useTheme()

export default function useTheme() {
    return useContext(ThemeContext)
}