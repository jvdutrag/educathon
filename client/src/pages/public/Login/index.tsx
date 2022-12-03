import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Typography, Box } from '@mui/material'

import { LoginForm } from '../../../components/forms'
import { useAlert } from '../../../hooks'

import * as authApiSlice from '../../../features/auth/authApiSlice'
import * as authSlice from '../../../features/auth/authSlice'

import { getErrorMessageByCode } from '../../../locale/errorMessages'

import routes from '../../../routes'

export default function Login() {
    document.title = 'Login | Educathon'

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [login, { isLoading }] = authApiSlice.useLoginMutation()

    const onLoginFormSubmit = async (data: any) => {
        const { email, password } = data

        await login({ email, password }).unwrap()
            .then((result) => {
                dispatch(authSlice.login(result))
                navigate(routes.HOME)
            })
            .catch(err => alert(getErrorMessageByCode(err.data.code), 'error'))
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                    Entrar como Professor
                </Typography>
                <LoginForm onSubmit={onLoginFormSubmit} isLoading={isLoading} />
                <Box sx={{ mt: 2 }}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, textAlign: { md: 'left', xs: 'center' } }}
                        component="span"
                    >
                        Ainda não é cadastrado(a)?&nbsp;
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, textAlign: { md: 'left', xs: 'center' }, textDecoration: 'none' }}
                        component={Link}
                        color="primary"
                        to={routes.REGISTER}
                    >
                        Registre-se aqui
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
