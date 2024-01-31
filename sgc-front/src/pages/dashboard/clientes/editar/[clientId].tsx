import { useEffect, useState } from 'react'
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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import 'dayjs/locale/pt-br'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Breadcumb from '../../../../components/breadcrumb/BreadCumb'
import { useRouter } from 'next/router'
import { useGetClienteById } from '../../../../hooks/useGetClientById'
import { useEditCliente } from '../../../../hooks/useEditOneClient'

const EditarCliente = () => {
    const router = useRouter()

    const { cliente, loadingGetClienteById, errorGetClienteById } =
        useGetClienteById()

    const { editCliente, loadingEditCliente, errorEditCliente } =
        useEditCliente()

    const [idCliente, setIdCliente] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [successEdition, setSuccessEdition] = useState(false)
    const [errorEdition, setErrorEdition] = useState(false)
    const [loading, setLoading] = useState(true)

    const [editUserData, setEditUserData] = useState({
        name: '',
        email: '',
        tel: '',
        coordX: 0,
        coordY: 0,
    })

    const [loggedAdmin, setLoggedAdmin] = useState({
        id: '',
        name: '',
        email: '',
        adminRole: '',
        number: '',
    })
    const { id, name, email, adminRole, number } = loggedAdmin

    const handleSubmit = async () => {
        const _data = {
            id: +idCliente,
            name: editUserData.name,
            email: editUserData.email,
            tel: editUserData.tel,
            coordX: +editUserData.coordX,
            coordY: +editUserData.coordY,
        }
        try {
            await editCliente(_data)
            setSuccessEdition(true)
        } catch (err: any) {
            setErrorEdition(true)
            setErrorMessage(err.message)
        }
    }

    const closeSuccess = () => {
        setSuccessEdition(false)
        window.location.reload()
    }

    const handleCancel = () => {
        window.location.href = '/dashboard/clientes'
    }

    const GetClienteById = async (id: string) => {
        setLoading(true)
        setIdCliente(id)
        try {
            const thisClient = await cliente({
                id: +id,
            })
            if (thisClient.data) {
                setEditUserData({
                    ...editUserData,
                    name: thisClient.data?.name,
                    email: thisClient.data?.email,
                    tel: thisClient.data?.tel,
                    coordX: thisClient.data?.coordX,
                    coordY: thisClient.data?.coordY,
                })
                setLoading(false)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const handleChange = async (event: any, eType: string) => {
        event.preventDefault()
        if (eType === 'name') {
            setEditUserData({ ...editUserData, name: event.target.value })
        }
        if (eType === 'email') {
            setEditUserData({ ...editUserData, email: event.target.value })
        }
        if (eType === 'tel') {
            setEditUserData({ ...editUserData, tel: event.target.value })
        }
        if (eType === 'coordX') {
            setEditUserData({ ...editUserData, coordX: event.target.value })
        }
        if (eType === 'coordY') {
            setEditUserData({ ...editUserData, coordY: event.target.value })
        }
    }

    useEffect(() => {
        const LoggedAdminNA: any = window.localStorage.getItem('LoggedAdminNA')
        const admin = JSON.parse(LoggedAdminNA)
        if (admin) {
            setLoggedAdmin({
                id: admin.id,
                name: admin.name,
                email: admin.email,
                adminRole: admin.adminRole,
                number: admin.number,
            })
        }

        const { clientId } = router.query
        const thisId = clientId as string
        if (thisId) {
            GetClienteById(thisId)
        }
    }, [router.query])
    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{ padding: '12px 14px' }}
                style={
                    successEdition || errorEdition
                        ? {
                              display: 'flex',
                              position: 'fixed',
                              zIndex: 1000,
                              right: '0',
                          }
                        : { display: 'none' }
                }
            >
                {successEdition ? (
                    <Alert severity="success" onClose={() => closeSuccess()}>
                        Sucesso na edição do Cliente!
                    </Alert>
                ) : (
                    <></>
                )}
                {errorEdition ? (
                    <Alert
                        severity="error"
                        onClose={() => setErrorEdition(false)}
                    >
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
                    <NavBar name={name} adminRole={adminRole} />
                    <Box className="main-container">
                        <HorizontalMenu />
                        <Breadcumb
                            name={'Clientes'}
                            description={'Editar Cliente'}
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
                                    borderBottom: '1px solid #3B4253',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ color: '#D0D2D6', fontSize: '22px' }}
                                >
                                    Editar Cliente
                                </Typography>
                                <Typography
                                    onClick={() =>
                                        (window.location.href = '/clientes')
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
                                                value={editUserData.name}
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
                                                value={editUserData.email}
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
                                                value={editUserData.tel}
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
                                                value={editUserData.coordX}
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
                                                value={editUserData.coordY}
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
                                    onClick={() => handleSubmit()}
                                    variant="contained"
                                    sx={{
                                        background: '#7367F0',
                                        color: '#fff',
                                        textTransform: 'inherit',
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => handleCancel()}
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

export default EditarCliente
