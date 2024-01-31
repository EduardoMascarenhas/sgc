import * as React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Logo from '../logo/Logo'
import {
    Badge,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Icon,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    Switch,
} from '@mui/material'
import {
    BorderColor,
    ConfirmationNumber,
    ExitToApp,
    FilterList,
    Notifications,
    SearchOutlined,
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuth'
import HorizontalMenuMobile from '../horizontalMenu/mobile'

function NavBar(props: any) {
    const [loggedAdmin, setLoggedAdmin] = React.useState({
        id: '',
        name: '',
        email: '',
    })

    const auth = useAuth()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const limitCharacteres = (nameToLimit: string) => {
        const name = nameToLimit
        if (name.length <= 14) {
            return name
        } else {
            const nameLimited = `${name.substring(0, 15).trim()}...`
            return nameLimited
        }
    }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    React.useEffect(() => {
        const LoggedAdminSGC: any =
            window.localStorage.getItem('LoggedAdminSGC')
        const admin = JSON.parse(LoggedAdminSGC)
        if (admin) {
            setLoggedAdmin({
                id: admin.id,
                name: admin.name,
                email: admin.email,
            })
        }
    }, [])

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#30334e',
                height: '64px',
                justifyContent: 'center',
            }}
        >
            <Container
                sx={{
                    maxWidth: '100%',
                    minWidth: '100%',
                    padding: '0',
                    margin: '0',
                }}
            >
                <Toolbar>
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item xs={4}>
                            <HorizontalMenuMobile />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            className="grid-logo"
                        >
                            <Logo size="S" />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <Box className="hide-on-768px">
                                <Box
                                    sx={{
                                        flexGrow: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 0,
                                        mr: 1,
                                    }}
                                >
                                    <Tooltip title={props.name}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#B4B7BD',
                                                lineHeight: '21px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {limitCharacteres(props.name)}
                                        </Typography>
                                    </Tooltip>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#B4B7BD',
                                            lineHeight: '21px',
                                            fontSize: '11px',
                                        }}
                                    >
                                        {props.adminRole}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Tooltip title={props.name}>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={props.name[0]}
                                            className="avatar-navbar"
                                            src="/static/images/avatar/5.png"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box className="show-on-768px">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Tooltip title={props.name}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#B4B7BD',
                                                        lineHeight: '21px',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {limitCharacteres(
                                                        props.name
                                                    )}
                                                </Typography>
                                            </Tooltip>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#B4B7BD',
                                                    lineHeight: '21px',
                                                    fontSize: '11px',
                                                }}
                                            >
                                                {props.adminRole}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider className="show-on-768px" />
                                    <MenuItem
                                        key={'Sair'}
                                        onClick={() => auth.logout()}
                                        sx={{ backgroundColor: '#30334e' }}
                                    >
                                        <ExitToApp fontSize="small" />
                                        <Typography
                                            textAlign="center"
                                            sx={{ ml: '5px' }}
                                        >
                                            Sair
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default NavBar
