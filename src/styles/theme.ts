import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette : {
        primary: {
            main: '#8e20d6', // Main purple color for your app
            light: '#c252ff', // Light shade for hover or active states
            dark: '#5b00a3', // Darker shade for buttons or focused elements
            contrastText: '#ffffff', // White text on primary elements
        },
        secondary: {
            main: '#00bcd4', // Teal color for secondary actions
            light: '#62efff', // Lighter teal for hover or accent
            dark: '#008ba3', // Darker teal for contrast
            contrastText: '#ffffff', // White text for secondary buttons
        },
        error: {
            main: '#e53935', // Red for errors
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ffa726', // Amber for warnings
            contrastText: '#000000',
        },
        info: {
            main: '#29b6f6', // Blue for informational messages
            contrastText: '#ffffff',
        },
        success: {
            main: '#66bb6a', // Green for success
            contrastText: '#ffffff',
        },
        background: {
            default: '#f9f9f9', // Light background for the app
            paper: '#ffffff', // White background for cards/dialogs
        },
        text: {
            primary: '#333333', // Dark gray for main text
            secondary: '#757575', // Lighter gray for secondary text
        },
    }
})

export default theme;