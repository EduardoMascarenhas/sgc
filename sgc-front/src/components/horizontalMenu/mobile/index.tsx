import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import {
    HouseOutlined,
    PeopleAltOutlined,
    PersonAddAlt1Outlined,
} from '@mui/icons-material'

type Anchor = 'left'

export default function HorizontalMenuMobile() {
    const [loggedAdmin, setLoggedAdmin] = React.useState({
        id: '',
        name: '',
        email: '',
    })
    const { id, name, email } = loggedAdmin

    const [state, setState] = React.useState({
        left: false,
    })

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

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }

            setState({ ...state, [anchor]: open })
        }

    const list = (anchor: Anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List
                className={`${
                    isActive('/dashboard') ? 'menuMobileActive' : ''
                }`}
            >
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => (window.location.href = '/dashboard')}
                    >
                        <ListItemIcon>
                            <HouseOutlined
                                sx={{ color: '#D0D2D6' }}
                                fontSize="medium"
                            />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List
                className={`${isActive('/clientes') ? 'menuMobileActive' : ''}`}
            >
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => (window.location.href = '/clientes')}
                    >
                        <ListItemIcon>
                            <PeopleAltOutlined
                                sx={{ color: '#D0D2D6' }}
                                fontSize="medium"
                            />
                        </ListItemIcon>
                        <ListItemText primary={'Clientes'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List
                className={`${
                    isActive('/clientes/adicionar') ? 'menuMobileActive' : ''
                }`}
            >
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() =>
                            (window.location.href = '/clientes/adicionar')
                        }
                    >
                        <ListItemIcon>
                            <PersonAddAlt1Outlined
                                sx={{ color: '#D0D2D6' }}
                                fontSize="medium"
                            />
                        </ListItemIcon>
                        <ListItemText primary={'Adicionar novo Cliente'} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </Box>
    )

    return (
        <Box className="horizontal-menu-mobile">
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)}>
                    {!state.left ? (
                        <MenuIcon fontSize="large" />
                    ) : (
                        <MenuOpenIcon fontSize="large" />
                    )}{' '}
                </Button>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                    className="menu-mobile"
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </Box>
    )
}
