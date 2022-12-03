import { useForm } from 'react-hook-form'
import { Grid, TextField, Button, CircularProgress as Loader } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

import { LoginSchema } from './schemas'

type LoginFormProps = {
    onSubmit: (data: any) => void,
    isLoading?: boolean
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="E-mail"
                        error={!!errors.email}
                        helperText={`${errors.email ? errors.email.message : ''}`}
                        {...register('email')}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        variant="outlined"
                        fullWidth
                        label="Senha"
                        error={!!errors.password}
                        helperText={`${errors.password ? errors.password.message : ''}`}
                        {...register('password')}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        size="large"
                    >
                        {
                            isLoading ? (
                                <Loader size={20} color="inherit" />
                            ) : (
                                <span>Entrar</span>
                            )
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
