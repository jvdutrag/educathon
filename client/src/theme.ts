import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#12296c',
        },
          secondary: {
            main: '#fbda03',
        },
    },
    typography: {
        fontFamily: 'Rubik, sans-serif',
        button: {
            textTransform: 'none'
        }
    }
})

export default theme
