import { FormEvent, useEffect, useState } from 'react'
import NavBar from '../../../components/navbar'
import HorizontalMenu from '../../../components/horizontalMenu'
import FallbackSpinner from '../../../components/spinner'
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    ptBR,
} from '@mui/x-data-grid'
import {
    Alert,
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Select,
    Tooltip,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    Stack,
    Pagination,
    Autocomplete,
} from '@mui/material'
import { useRouter } from 'next/router'
import {
    Add,
    MoreVertOutlined,
    SearchOutlined,
    RouteOutlined,
    BlockOutlined,
} from '@mui/icons-material'
import { IClient } from '../../../interfaces/IClient'
import { FindClientsPaginatedInput } from '../../../hooks/queries/getClients'
import { useGetClients } from '../../../hooks/useGetClients'
import { ClienteModel } from '../../../models/Cliente.model.class'
import Breadcumb from '../../../components/breadcrumb/BreadCumb'
import { useCalculateRoute } from '../../../hooks/calculateRoute'

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '12px 14px',
                }}
            >
                <Typography variant="body1">Lista filtrada</Typography>
                <GridToolbarExport
                    printOptions={{ disableToolbarButton: true }}
                />
            </Box>
        </GridToolbarContainer>
    )
}

const Clientes = () => {
    const router = useRouter()
    const { clients, loadingGetClients, errorGetClients } = useGetClients()
    const { route, loadingGetCalculateRoute, errorGetCalculateRoute } =
        useCalculateRoute()

    const [loading, setLoading] = useState(true)
    const [loadingList, setLoadingList] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchBy, setSearchBy] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [bestRoute, setBestRoute] = useState<any[]>([])
    const [rows, setRows] = useState<ClienteModel[]>([])
    const [errorMessage, setErrorMessage] = useState('')

    const tiposBusca = ['Nome', 'Email', 'Telefone']
    const [busca, setBusca] = useState<string | null>('Nome')
    const [inputProvider, setInputProvider] = useState('')

    const [loggedAdmin, setLoggedAdmin] = useState({
        id: '',
        name: '',
        email: '',
    })
    const { id, name, email } = loggedAdmin

    const MenuActions = (params: any) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        const [deactivatedReason, setDeactivatedReason] = useState('')
        const open = anchorEl ? true : false
        const handleClickAcao = (event: any) => {
            setAnchorEl(event.currentTarget)
        }
        const handleCloseAcao = () => {
            setAnchorEl(null)
        }
        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MoreVertOutlined
                        id={`icon-${params.id}`}
                        className="actions-icon"
                        fontSize="small"
                        aria-controls={open ? `menu-${params.id}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickAcao}
                    />
                    <Menu
                        id={`menu-${params.id}`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseAcao}
                        MenuListProps={{
                            'aria-labelledby': `${params.id}`,
                        }}
                    >
                        <MenuItem
                            onClick={() =>
                                window.open(
                                    `/dashboard/clientes/editar/${params.id}`
                                )
                            }
                        >
                            Editar
                        </MenuItem>
                    </Menu>
                </Box>
            </>
        )
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', minWidth: 100 },
        { field: 'name', headerName: 'Nome', minWidth: 225 },
        { field: 'email', headerName: 'Email', minWidth: 225 },
        { field: 'tel', headerName: 'Telefone', minWidth: 150 },
        {
            field: 'coordX',
            headerName: 'Coordenada X',
            minWidth: 125,
        },
        {
            field: 'coordY',
            headerName: 'Coordenada Y',
            minWidth: 125,
        },
        { field: 'createdAt', headerName: 'Data de Criação', minWidth: 150 },
        {
            field: 'action',
            headerName: 'Ações',
            minWidth: 50,
            renderCell: (params) => {
                return <MenuActions id={params.id} />
            },
        },
    ]

    const [modalRoute, setModalRoute] = useState(false)

    const handleModalRoute = (event: FormEvent) => {
        event.preventDefault()
        setModalRoute(!modalRoute)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        GetClients()
    }

    const GetClients = async () => {
        setLoadingList(true)
        try {
            let _data: FindClientsPaginatedInput = {
                skip: (page - 1) * rowsPerPage,
                take: rowsPerPage,
            }

            if (busca === 'Email') {
                _data.email = searchBy
            } else if (busca === 'Telefone') {
                _data.tel = searchBy
            } else {
                _data.name = searchBy
            }
            const response = await clients(_data)
            if (response.data) {
                const data = response.data.clients.map(
                    (item) =>
                        new ClienteModel(
                            item.id,
                            item.name,
                            item.email,
                            +item.coordX,
                            +item.coordY,
                            item.tel,
                            item.createdAt,
                            item.updatedAt
                        )
                )
                setTotalPages(Math.ceil(response.data.count / rowsPerPage))
                setTotalItems(response.data.count)
                setRows(data)
                setLoading(false)
                setLoadingList(false)
            }
        } catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    const GetRoute = async () => {
        try {
            const { data } = await route()
            setBestRoute(JSON.parse(data))
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const handleChangeSearchBy = async (event: any) => {
        event.preventDefault()
        setPage(1)
        setSearchBy(event.target.value)
    }

    const handleChangePage = async (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        event.preventDefault()
        setLoadingList(true)
        const valueToSkip = value - 1
        setRows([])
        try {
            let _data: FindClientsPaginatedInput = {
                skip: valueToSkip * rowsPerPage,
                take: rowsPerPage,
            }

            if (busca === 'Email') {
                _data.email = searchBy
            } else if (busca === 'Telefone') {
                _data.tel = searchBy
            } else {
                _data.name = searchBy
            }
            const response = await clients(_data)
            if (response.data) {
                const data = response.data.clients.map(
                    (item) =>
                        new ClienteModel(
                            item.id,
                            item.name,
                            item.email,
                            +item.coordX,
                            +item.coordY,
                            item.tel,
                            item.createdAt,
                            item.updatedAt
                        )
                )
                setRows(data)
                setPage(value)
                setLoadingList(false)
            }
        } catch (e: any) {
            setLoadingList(true)
            setErrorMessage(e.message)
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
        GetClients()
        GetRoute()
    }, [])

    return (
        <>
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
                            description={'Lista de Clientes'}
                            linkList={[
                                {
                                    link: '/dashboard/clientes',
                                    linkName: 'Clientes',
                                },
                            ]}
                        />
                        <Grid container className="search-bar">
                            <Grid
                                item
                                xs={8}
                                sx={{
                                    display: 'flex',
                                    alignItens: 'center',
                                    height: '100%',
                                }}
                            >
                                <SearchOutlined
                                    onClick={handleSubmit}
                                    fontSize="inherit"
                                    sx={{
                                        color: '#D0D2D6',
                                        cursor: 'pointer',
                                        fontSize: '25px',
                                    }}
                                />
                                <form
                                    onSubmit={handleSubmit}
                                    className="form-search-by-name"
                                >
                                    <FormControl
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {busca === 'Nome' ? (
                                            <input
                                                placeholder="Buscar por nome..."
                                                type="text"
                                                className="search-by-name"
                                                value={searchBy}
                                                onChange={handleChangeSearchBy}
                                            />
                                        ) : busca === 'Email' ? (
                                            <input
                                                placeholder="Buscar por email..."
                                                type="text"
                                                className="search-by-name"
                                                value={searchBy}
                                                onChange={handleChangeSearchBy}
                                            />
                                        ) : busca === 'Telefone' ? (
                                            <input
                                                placeholder="Buscar por telefone..."
                                                type="text"
                                                className="search-by-name"
                                                value={searchBy}
                                                onChange={handleChangeSearchBy}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </FormControl>
                                </form>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sx={{
                                    display: 'flex',
                                    alignItens: 'center',
                                    justifyContent: 'right',
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ mb: '20px' }}>
                                    <Autocomplete
                                        value={busca}
                                        sx={{
                                            minWidth: '300px',
                                            marginTop: '-7px',
                                            marginRight: '15px',
                                        }}
                                        onChange={(
                                            event: any,
                                            newValue: string | null
                                        ) => {
                                            setBusca(newValue)
                                        }}
                                        inputValue={inputProvider}
                                        onInputChange={(
                                            event,
                                            newInputValue
                                        ) => {
                                            setInputProvider(newInputValue)
                                        }}
                                        id="tiposDeBusca"
                                        options={tiposBusca}
                                        className={'customSelectField'}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Selecione o tipo de busca"
                                            />
                                        )}
                                    />
                                </Box>
                                <Button
                                    onClick={() =>
                                        router.push(
                                            '/dashboard/clientes/adicionar'
                                        )
                                    }
                                    className={`horizontalMenuButton horizontalMenuButtonActive`}
                                    variant={'contained'}
                                >
                                    <Add
                                        fontSize="small"
                                        sx={{
                                            marginRight: '5px',
                                            minWidth: 'max-content',
                                            padding: '0 6px',
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            minWidth: 'fit-content',
                                            paddingRight: '10px',
                                        }}
                                    >
                                        Adicionar
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ height: '500px' }}>
                            <DataGrid
                                sx={{
                                    color: '#D0D2D6',
                                    background: '#283046',
                                    border: 'none',
                                    borderRadius: '6px',
                                }}
                                rows={rows}
                                columns={columns}
                                loading={loadingList}
                                localeText={
                                    ptBR.components.MuiDataGrid.defaultProps
                                        .localeText
                                }
                                pageSize={10}
                                rowSpacingType="margin"
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                            />
                        </Box>
                        <Box className="box-table">
                            <div>
                                <Button
                                    onClick={(e: any) => handleModalRoute(e)}
                                    className={`horizontalMenuButton horizontalMenuButtonActive`}
                                    variant={'contained'}
                                >
                                    <RouteOutlined
                                        fontSize="small"
                                        sx={{
                                            marginRight: '5px',
                                            minWidth: 'max-content',
                                            padding: '0 6px',
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            minWidth: 'fit-content',
                                            paddingRight: '10px',
                                        }}
                                    >
                                        Calcular Rota
                                    </Typography>
                                </Button>
                            </div>
                            <Stack spacing={2}>
                                <Pagination
                                    count={totalPages}
                                    variant="outlined"
                                    color="primary"
                                    page={page}
                                    onChange={handleChangePage}
                                />
                            </Stack>
                        </Box>
                    </Box>
                </>
            )}
            <Dialog
                open={modalRoute}
                onClose={(e: any) => handleModalRoute(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="custom-dialog"
            >
                <DialogContent
                    sx={{
                        backgroundColor: '#283046',
                        color: '#D0D2D6',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                            mb: '16px',
                        }}
                    >
                        <DialogContentText id="alert-dialog-description">
                            <RouteOutlined
                                fontSize="large"
                                sx={{ color: '#7367f0', fontSize: '80px' }}
                            />
                        </DialogContentText>
                        <Typography variant="h5">Melhor Rota</Typography>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="dialog-grid-posicao"
                                    >
                                        Nº
                                    </th>
                                    <th
                                        scope="col"
                                        className="dialog-grid-name"
                                    >
                                        Nome
                                    </th>
                                    <th
                                        scope="col"
                                        className="dialog-grid-coordx"
                                    >
                                        Coordenada X
                                    </th>
                                    <th
                                        scope="col"
                                        className="dialog-grid-coordy"
                                    >
                                        Coordenada Y
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestRoute.map((r, i) => {
                                    return (
                                        <tr className="custom-tr">
                                            <td scope="row">
                                                <p key={`posicao-${i}`}>{i}</p>
                                            </td>
                                            <td scope="row">
                                                <p key={`name-${i}`}>
                                                    {r.name}
                                                </p>
                                            </td>
                                            <td>
                                                <p key={`coordX-${i}`}>
                                                    {r.coordX}
                                                </p>
                                            </td>
                                            <td>
                                                <p key={`coordY-${i}`}>
                                                    {r.coordY}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={(e: any) => handleModalRoute(e)}
                            variant="outlined"
                            sx={{
                                color: '#82868B',
                                borderColor: '#82868B',
                                textTransform: 'inherit',
                            }}
                        >
                            Fechar
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Clientes
