import { FormEvent, useEffect, useState } from 'react'
import NavBar from '../../../../components/navbar'
import HorizontalMenu from '../../../../components/horizontalMenu'
import FallbackSpinner from '../../../../components/spinner'
import {
    Box,
    Typography,
    Grid,
    Button,
    Alert,
    TextField,
    Autocomplete,
} from '@mui/material'
import { useRouter } from 'next/router'
import Breadcumb from '../../../../components/breadcrumb/BreadCumb'
import { useCreateCliente } from '../../../../hooks/useCreateOneClient'

const NovoCliente = () => {
    const router = useRouter()
    const { createCliente, loadingCreateCliente, errorCreateCliente } =
        useCreateCliente()
    const [loading, setLoading] = useState(true)

    const [successCreation, setSuccessCreation] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [loggedAdmin, setLoggedAdmin] = useState({
        id: '',
        name: '',
        email: '',
    })
    const { id, name, email } = loggedAdmin

    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        tel: '',
        coordX: 0,
        coordY: 0,
    })

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const _data = {
            name: newUserData.name,
            email: newUserData.email,
            tel: newUserData.tel,
            coordX: +newUserData.coordX,
            coordY: +newUserData.coordY,
        }
        try {
            await createCliente(_data)
            setNewUserData({
                name: '',
                email: '',
                tel: '',
                coordX: 0,
                coordY: 0,
            })
            setSuccessCreation(true)
        } catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    const handleCancel = async (event: FormEvent) => {
        event.preventDefault()

        router.push('/dashboard/clientes')
    }

    const handleChange = async (event: any, eType: string) => {
        event.preventDefault()
        if (eType === 'name') {
            setNewUserData({ ...newUserData, name: event.target.value })
        }
        if (eType === 'email') {
            setNewUserData({ ...newUserData, email: event.target.value })
        }
        if (eType === 'tel') {
            setNewUserData({ ...newUserData, tel: event.target.value })
        }
        if (eType === 'coordX') {
            setNewUserData({ ...newUserData, coordX: event.target.value })
        }
        if (eType === 'coordY') {
            setNewUserData({ ...newUserData, coordY: event.target.value })
        }
    }

    useEffect(() => {
        const LoggedAdminSGC: any =
            window.localStorage.getItem('LoggedAdminSGC')
        const admin = JSON.parse(LoggedAdminSGC)
        if (admin) {
            setLoggedAdmin({
                id: admin.id,
                name: admin.name,
                email: admin.email,
            })
            setLoading(false)
        }
    }, [])

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{ padding: '12px 14px' }}
                style={
                    successCreation || errorMessage != ''
                        ? {
                              display: 'flex',
                              position: 'fixed',
                              zIndex: 1000,
                              right: '0',
                          }
                        : { display: 'none' }
                }
            >
                {successCreation ? (
                    <Alert
                        severity="success"
                        onClose={() => setSuccessCreation(false)}
                    >
                        Sucesso na criação do novo Cliente!
                    </Alert>
                ) : (
                    <></>
                )}
                {errorMessage != '' ? (
                    <Alert severity="error" onClose={() => setErrorMessage('')}>
                        {errorMessage}
                    </Alert>
                ) : (
                    <></>
                )}
            </Box>
            {loading ? (
                <FallbackSpinner />
            ) : (
                <>
                    <NavBar
                        name={name}
                        adminRole={'ADMINISTRADOR'}
                        id={id}
                        email={email}
                    />
                    <Box className="main-container">
                        <HorizontalMenu />
                        <Breadcumb
                            name={'Clientes'}
                            description={'Novo Cliente'}
                            linkList={[
                                {
                                    link: '/dashboard/clientes',
                                    linkName: 'Clientes',
                                },
                            ]}
                        />
                        <Box
                            sx={{
                                width: '100%',
                                margin: 'auto',
                                background: '#283046',
                                position: 'relative',
                                borderRadius: '6px',
                                mt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '12px 14px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ color: '#D0D2D6', fontSize: '22px' }}
                                >
                                    Novo Cliente
                                </Typography>
                                <Typography
                                    onClick={() =>
                                        (window.location.href =
                                            '/dashboard/clientes')
                                    }
                                    className="main-hover"
                                    variant="body1"
                                    sx={{
                                        color: '#D0D2D6',
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Voltar
                                </Typography>
                            </Box>
                            <Box sx={{ padding: '12px 14px', display: 'flex' }}>
                                <Grid container>
                                    <Grid item xs={6} className="container-6">
                                        <Box sx={{ mb: '20px' }}>
                                            <Typography variant="body1">
                                                {' '}
                                                Nome Completo
                                            </Typography>
                                            <TextField
                                                name="name"
                                                onChange={(e: any) =>
                                                    handleChange(e, 'name')
                                                }
                                                value={newUserData.name}
                                                placeholder="Nome Completo"
                                            />
                                        </Box>
                                        <Box sx={{ mb: '20px' }}>
                                            <Typography variant="body1">
                                                {' '}
                                                Email
                                            </Typography>
                                            <TextField
                                                name="email"
                                                onChange={(e: any) =>
                                                    handleChange(e, 'email')
                                                }
                                                value={newUserData.email}
                                                placeholder="Email"
                                            />
                                        </Box>
                                        <Box sx={{ mb: '20px' }}>
                                            <Typography variant="body1">
                                                {' '}
                                                Telefone
                                            </Typography>
                                            <TextField
                                                name="number"
                                                onChange={(e: any) =>
                                                    handleChange(e, 'tel')
                                                }
                                                value={newUserData.tel}
                                                placeholder="(99) 99999-9999"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} className="container-6">
                                        <Box sx={{ mb: '20px' }}>
                                            <Typography variant="body1">
                                                {' '}
                                                Coordenada X
                                            </Typography>
                                            <TextField
                                                name="number"
                                                onChange={(e: any) =>
                                                    handleChange(e, 'coordX')
                                                }
                                                value={newUserData.coordX}
                                                placeholder="(99) 99999-9999"
                                            />
                                        </Box>
                                        <Box sx={{ mb: '20px' }}>
                                            <Typography variant="body1">
                                                {' '}
                                                Coordenada Y
                                            </Typography>
                                            <TextField
                                                name="number"
                                                onChange={(e: any) =>
                                                    handleChange(e, 'coordY')
                                                }
                                                value={newUserData.coordY}
                                                placeholder="(99) 99999-9999"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box
                                sx={{
                                    padding: '12px 14px',
                                    display: 'flex',
                                    gap: 2,
                                }}
                            >
                                <Button
                                    onClick={(e: any) => handleSubmit(e)}
                                    variant="contained"
                                    sx={{
                                        background: '#7367F0',
                                        color: '#fff',
                                        textTransform: 'inherit',
                                    }}
                                >
                                    Adicionar
                                </Button>
                                <Button
                                    onClick={(e: any) => handleCancel(e)}
                                    variant="outlined"
                                    sx={{
                                        color: '#82868B',
                                        borderColor: '#82868B',
                                        textTransform: 'inherit',
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default NovoCliente
