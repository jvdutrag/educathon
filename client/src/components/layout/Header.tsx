import { useState } from 'react'
import {
    AppBar, Container, Box, IconButton, Toolbar, 
    Button, Avatar, SxProps, Menu, MenuItem, ListItemIcon, Divider
} from '@mui/material'
import {
    Menu as MenuIcon,
    Business as BusinessIcon,
    Help as HelpIcon,
    Info as InfoIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    PersonAdd as RegisterIcon,
    Person as PersonIcon,
    Quiz as QuizIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import { Logo } from '../default'

import { useIsLogged, useLogout, useUser } from '../../hooks'
import { displayIfLogged } from '../../utils'

import routes from '../../routes'

export default function Header({ sx }: { sx?: SxProps }) {
    const isLogged = useIsLogged()
    const logout = useLogout()
    const user = useUser()
    const navigate = useNavigate()

    const [avatarElement, setAvatarElement] = useState<null | HTMLElement>(null)

    return (
        <AppBar position="static" sx={sx} color="primary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Logo color="secondary" />

                {/* Mobile Menu */}
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1
                    }}
                >
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Logo color="secondary" />
                </Box>
                {/* End of Mobile Menu */}
              
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        ml: 2
                    }}
                >
                    <Button
                        sx={{ my: 2, mr: 1 }}
                        variant="text"
                        color="inherit"
                        onClick={() => navigate(routes.ABOUT_US)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <InfoIcon sx={{ mr: 1 }} />
                            Sobre nós
                        </div>
                    </Button>
                    <Button
                        sx={{
                            my: 2,
                            mr: 1
                        }}
                        variant="text"
                        color="inherit"
                        onClick={() => navigate(routes.SUPPORT)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <HelpIcon sx={{ mr: 1 }} />
                            Suporte
                        </div>
                    </Button>
                    <Button
                        sx={{
                            my: 2,
                            mr: 1,
                            ...displayIfLogged(isLogged)
                        }}
                        variant="text"
                        color="inherit"
                        onClick={() => navigate(routes.SCHOOL_LIST)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <BusinessIcon sx={{ mr: 1 }} />
                            Escolas
                        </div>
                    </Button>
                    <Button
                        sx={{
                            my: 2,
                            mr: 1,
                            ...displayIfLogged(isLogged)
                        }}
                        variant="text"
                        color="inherit"
                        onClick={() => navigate(routes.QUIZ_LIST)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <QuizIcon sx={{ mr: 1 }} />
                            Quizzes
                        </div>
                    </Button>
                </Box>
    
                <Box sx={{ flexGrow: 0 }}>
                    {
                        (isLogged && user) ? (
                            <Box>
                                <IconButton
                                    sx={{ p: 0 }}
                                    onClick={e => setAvatarElement(e.currentTarget)}
                                >
                                    <Avatar sx={{ bgcolor: 'secondary.200' }}>
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    open={Boolean(avatarElement)}
                                    anchorEl={avatarElement}
                                    onClose={() => setAvatarElement(null)}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                          overflow: 'visible',
                                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                          mt: 1.5,
                                          '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                          },
                                          '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                          },
                                        },
                                      }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        {user.email}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={() => navigate(routes.USER_SETTINGS)}
                                    >
                                        <ListItemIcon>
                                            <SettingsIcon fontSize="small" />
                                        </ListItemIcon>
                                        Configurações
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => logout()}
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Sair
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    sx={{ my: 2, mr: 1 }}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate(routes.LOGIN)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <LoginIcon sx={{ mr: 1 }} />
                                        Entrar
                                    </div>
                                </Button>
                                <Button
                                    sx={{ my: 2 }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate(routes.REGISTER)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <RegisterIcon sx={{ mr: 1 }} />
                                        Junte-se a nós
                                    </div>
                                </Button>
                            </Box>
                        )
                    }
                </Box>
            </Toolbar>
          </Container>
        </AppBar>
    )
}
