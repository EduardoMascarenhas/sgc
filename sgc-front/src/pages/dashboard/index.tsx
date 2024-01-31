import { useEffect, useState } from 'react'
import NavBar from '../../components/navbar'
import HorizontalMenu from '../../components/horizontalMenu'
import FallbackSpinner from '../../components/spinner'
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
} from '@mui/material'
import { useRouter } from 'next/router'
import { MoreVertOutlined } from '@mui/icons-material'
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

const Dashboard = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [loadingList, setLoadingList] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchBy, setSearchBy] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [rows, setRows] = useState([])
    const [loggedAdmin, setLoggedAdmin] = useState({
        id: '',
        name: '',
        email: '',
    })
    const { id, name, email } = loggedAdmin

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
                        <Box sx={{ height: '500px', mt: '55px' }}>
                            <Typography variant="h5" color={'#fff'}>
                                Bem vindo ao Dashboard!
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

export default Dashboard
