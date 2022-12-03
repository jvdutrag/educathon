import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Typography, Box } from '@mui/material'
import { cnpj } from 'cpf-cnpj-validator'

import { RegisterForm } from '../../../components/forms'
import { Image } from '../../../components'
import { useAlert } from '../../../hooks'

import { getErrorMessageByCode } from '../../../locale/errorMessages'

import * as authApiSlice from '../../../features/auth/authApiSlice'
import * as authSlice from '../../../features/auth/authSlice'

import StaffImage from '../../../assets/vectors/staff.png'

import routes from '../../../routes'

export default function Register() {
    document.title = 'Junte-se a nós | Educathon'

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [register, { isLoading: isRegisterLoading }] = authApiSlice.useRegisterMutation()
    const [login, { isLoading: isLoginLoading }] = authApiSlice.useLoginMutation()

    const onRegisterFormSubmit = async (data: any) => {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            cnpj: cnpj.strip(data.cnpj)
        }

        await register(payload).unwrap()
            .then(() => {
                login({ email: data.email, password: data.password }).unwrap()
                    .then((result) => {
                        dispatch(authSlice.login(result))
                        navigate(routes.HOME)
                    })
                    .catch(() => navigate(routes.LOGIN))
            })
            .catch(err => alert(getErrorMessageByCode(err.data.code), 'error'))
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <Image src={StaffImage} sx={{ maxWidth: '450px', width: '100%', height: 'auto' }} />
                <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                    Junte-se a nós
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    O cadastro é apenas para professores. Para criar seu cadastro, é necessário informar o CNPJ da escola em que trabalha.
                </Typography>
                <Typography variant="body1">
                    Se sua escola for cliente do Educathon, você será atrelado(a) ao quadro de professores.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <RegisterForm onSubmit={onRegisterFormSubmit} isLoading={isRegisterLoading || isLoginLoading} />
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, textAlign: { md: 'left', xs: 'center' } }}
                        component="span"
                    >
                        Já tem uma conta?&nbsp;
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, textAlign: { md: 'left', xs: 'center' }, textDecoration: 'none' }}
                        component={Link}
                        color="primary"
                        to={routes.LOGIN}
                    >
                        Entre aqui
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
