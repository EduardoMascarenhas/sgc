import { useState, useEffect } from 'react'
import { Box, Menu, MenuItem, Typography, Button } from '@mui/material'
import {
    HouseOutlined,
    PeopleAltOutlined,
    KeyboardArrowDown,
    FilterListOutlined,
    PersonAddAlt1Outlined,
} from '@mui/icons-material'
import { useRouter } from 'next/router'

const HorizontalMenu = () => {
    const router = useRouter()

    const [loggedAdmin, setLoggedAdmin] = useState({
        id: '',
        name: '',
        email: '',
    })
    const { id, name, email } = loggedAdmin

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open1 = Boolean(anchorEl)
    const handleClickClientes = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseClientes = () => {
        setAnchorEl(null)
    }
    //dashboard menu

    const isActive = (buttonName: string) => {
        if (typeof window !== 'undefined') {
            if (buttonName === window.location.pathname) {
                return true
            }
            return false
        } else {
            return false
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
            })
        }
    }, [])

    return (
        <Box className="horizontal-menu">
            <Button
                onClick={() => router.push('/dashboard')}
                className={`horizontalMenuButton ${
                    isActive('/dashboard') ? 'horizontalMenuButtonActive' : ''
                }`}
                variant={`${isActive('/dashboard') ? 'contained' : 'text'}`}
            >
                <HouseOutlined fontSize="small" sx={{ marginRight: '5px' }} />
                <Typography variant="body1">Dashboard</Typography>
            </Button>
            <Button
                id="basic-button"
                aria-controls={open1 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? 'true' : undefined}
                onClick={handleClickClientes}
                className={`horizontalMenuButton ${
                    isActive('/dashboard/clientes') ||
                    isActive('/dashboard/clientes/adicionar')
                        ? 'horizontalMenuButtonActive'
                        : ''
                }`}
                variant={`${
                    isActive('/dashboard/clientes') ||
                    isActive('/dashboard/clientes/adicionar')
                        ? 'contained'
                        : 'text'
                }`}
            >
                <PeopleAltOutlined
                    fontSize="small"
                    sx={{ marginRight: '5px' }}
                />
                <Typography variant="body1">Clientes</Typography>
                <KeyboardArrowDown fontSize="small" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={handleCloseClientes}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() =>
                        (window.location.href = '/dashboard/clientes')
                    }
                >
                    <FilterListOutlined
                        fontSize="small"
                        sx={{ marginRight: '5px' }}
                    />
                    Lista de Clientes
                </MenuItem>
                <MenuItem
                    onClick={() => router.push('/dashboard/clientes/adicionar')}
                >
                    <PersonAddAlt1Outlined
                        fontSize="small"
                        sx={{ marginRight: '5px' }}
                    />
                    Adicionar novo Cliente
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default HorizontalMenu
