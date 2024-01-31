import { FormEvent, ReactNode, useEffect, useState } from 'react'
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Link,
    styled,
    TextField,
    Button,
    Typography,
} from '@mui/material'
import Logo from '../../components/logo/Logo'
import useAdminLogin from '../../hooks/useAdminLogin'
import { useAuth } from '../../hooks/useAuth'
import { IAdmin } from '../../interfaces/IAdmin'
import { useRouter } from 'next/router'
import FallbackSpinner from '../../components/spinner'

const Login = () => {
    const router = useRouter()
    const [signInAdmin] = useAdminLogin()

    const auth = useAuth()
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('master@master.com.br')
    const [password, setPassword] = useState('senhamaster')
    const [remember, setRemember] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event: any) => {
        setPassword(event.target.value)
    }
    const handleChangeRemember = (event: any) => {
        setRemember(event.target.value)
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setErrorMessage('')
        try {
            const { data } = await signInAdmin({
                variables: {
                    data: {
                        email: email,
                        password: password,
                    },
                },
            })
            if (data) {
                console.log(data)
                const loggedAdmin: IAdmin = data.signInAdmin.admin
                auth.login(loggedAdmin, data.signInAdmin.token)
            }
        } catch (err: any) {
            setErrorMessage(err.message)
        }
    }
    const dismissError = () => {
        setErrorMessage('')
    }

    useEffect(() => {
        const LoggedAdminSGC: any =
            window.localStorage.getItem('LoggedAdminSGC')
        const admin = JSON.parse(LoggedAdminSGC)
        if (admin) {
            router.replace('/dashboard')
        } else {
            setLoading(false)
        }
    }, [])
    return (
        <>
            {loading ? (
                <FallbackSpinner />
            ) : (
                <>
                    {!errorMessage.length ? (
                        ''
                    ) : (
                        <Box
                            sx={{
                                top: '48px',
                                maxWidth: '300px',
                                position: 'absolute',
                                right: '48px',
                            }}
                        >
                            <Alert
                                severity="error"
                                onClose={() => dismissError()}
                            >
                                {errorMessage}
                            </Alert>
                        </Box>
                    )}
                    <Box sx={{ height: '100vh', display: 'flex' }}>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                width: '100%',
                                maxWidth: '410px',
                                maxHeight: '500px',
                                background: '#283046',
                                borderRadius: '6px',
                                padding: '98px 35px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                margin: 'auto',
                                gap: '10px',
                            }}
                        >
                            <Logo size="L" />
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={{ mt: '25px' }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#D0D2D6',
                                        fontSize: '14px',
                                        mb: 1,
                                    }}
                                >
                                    {' '}
                                    Email
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="email"
                                    placeholder="Insira o seu email"
                                    type="text"
                                    variant="outlined"
                                    onChange={handleChangeEmail}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={{ mt: '15px' }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#D0D2D6',
                                        fontSize: '14px',
                                        mb: 1,
                                    }}
                                >
                                    {' '}
                                    Senha
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="password"
                                    placeholder="Insira sua senha"
                                    type="password"
                                    variant="outlined"
                                    onChange={handleChangePassword}
                                />
                            </FormControl>
                            <Box
                                sx={{
                                    mt: 6,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox value={remember} />}
                                        label="Lembrar-me"
                                        onChange={handleChangeRemember}
                                    />
                                </FormGroup>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#7367F0',
                                        fontSize: '12px',
                                        mb: 1,
                                        cursor: 'pointer',
                                        ':hover': { color: '#D0D2D6' },
                                    }}
                                >
                                    {' '}
                                    Esqueceu a senha?
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 6, width: '100%' }}>
                                <Button
                                    type="submit"
                                    disabled={!email.length || !password.length}
                                    sx={{ width: '100%' }}
                                    variant="contained"
                                >
                                    Entrar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </>
            )}
        </>
    )
}

export default Login
