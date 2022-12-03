import { Grid, Typography } from '@mui/material'

export default function Settings() {
    document.title = 'Configurações | Educathon'

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    Configurações
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Em breve
                </Typography>
            </Grid>
        </Grid>
    )
}
