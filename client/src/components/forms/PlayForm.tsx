import { useForm } from 'react-hook-form'
import { Grid, TextField, Button, CircularProgress as Loader } from '@mui/material'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { PlaySchema } from './schemas'

type PlayFormProps = {
    onSubmit: (data: any) => void,
    isLoading?: boolean
}

export default function PlayForm({ onSubmit, isLoading }: PlayFormProps) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(PlaySchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Nome do aluno"
                        placeholder="Ex: José da Silva"
                        error={!!errors.name}
                        helperText={`${errors.name ? errors.name.message : ''}`}
                        {...register('name')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="RA (Registro de Aluno)"
                        error={!!errors.internalId}
                        placeholder="Ex: 65565446"
                        helperText={`${errors.internalId ? errors.internalId.message : ''}`}
                        fullWidth
                        {...register('internalId')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                label="Código do Quiz"
                                placeholder="Ex: ERTYYH"
                                error={!!errors.code}
                                helperText={`${errors.code ? errors.code.message : ''}`}
                                fullWidth
                                onChange={(e) => {
                                    const value = e.target.value

                                    if (value.length > 6) {
                                        return
                                    }

                                    const formated = value.replace(/[0-9]/g, '').toUpperCase()
                                    field.onChange(formated)
                                }}
                                value={field.value}
                                name={field.name}
                                onBlur={field.onBlur}
                                ref={field.ref}
                            />
                        )}
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
                                <span>Jogar</span>
                            )
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
