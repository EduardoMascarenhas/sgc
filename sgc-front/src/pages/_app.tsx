import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../constants/apollo-client'
import { AuthProvider } from '../components/context/AuthContext'
import { ThemeProvider } from '@mui/material/styles'
import { SGCTheme } from '../../styles/theme/theme'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider theme={SGCTheme}>
                <ApolloProvider client={client}>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </ApolloProvider>
            </ThemeProvider>
        </>
    )
}
