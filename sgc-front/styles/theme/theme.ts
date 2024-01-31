import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'

export const SGCTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#7367F0',
            },
            text: {
                primary: '#D0D2D6',
            },
            background: {
                default: '#161D31',
                paper: '#161D31',
            },
        },
        typography: {
            body1: {
                color: '#D0D2D6',
                fontSize: '14px',
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        maxWidth: '500px',
                        width: '100%',
                        borderColor: '#D0D2D6',
                        borderRadius: '6px',
                    },
                    input: {
                        border: 'none',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderColor: '#D0D2D6',
                        borderRadius: '6px',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        maxWidth: '500px',
                        width: '100%',
                        borderRadius: '6px',
                    },
                },
            },
        },
    },
    ptBR
)
