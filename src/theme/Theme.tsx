import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
            light: '#fff',
            dark: '#fff',
            contrastText: '#fff',
        }
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '4000px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    variant: 'outlined',
                    width: '1000px',
                    color: 'primary',
                    // backgroundColor: 'primary'
                }
            }
        }
    }
})