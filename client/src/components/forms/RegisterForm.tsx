import { useForm } from 'react-hook-form'
import { Grid, TextField, Button, CircularProgress as Loader } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

import { RegisterSchema } from './schemas'

import TextFieldMask from '../default/TextFieldMask'

type RegisterFormProps = {
    onSubmit: (data: any) => void,
    isLoading?: boolean
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Nome completo"
                        error={!!errors.name}
                        helperText={`${errors.name ? errors.name.message : ''}`}
                        {...register('name')}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="E-mail"
                        error={!!errors.email}
                        helperText={`${errors.email ? errors.email.message : ''}`}
                        {...register('email')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextFieldMask
                        mask="99.999.999/9999-99"
                        control={control}
                        fullWidth
                        label="CNPJ da escola"
                        name="cnpj"
                        error={!!errors.cnpj}
                        helperText={!!errors.cnpj && errors.cnpj.message}
                        inputProps={{
                          ...register('document')
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="password"
                        variant="outlined"
                        fullWidth
                        label="Senha"
                        error={!!errors.password || !!errors.passwordConfirmation}
                        helperText={`${errors.password ? errors.password.message : ''}`}
                        {...register('password')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="password"
                        variant="outlined"
                        fullWidth
                        label="Confirme sua senha"
                        error={!!errors.passwordConfirmation || !!errors.password}
                        helperText={`${errors.passwordConfirmation ? errors.passwordConfirmation.message : ''}`}
                        {...register('passwordConfirmation')}
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
                                <span>Criar conta</span>
                            )
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
