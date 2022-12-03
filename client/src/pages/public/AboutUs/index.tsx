import { Grid, Typography } from '@mui/material'

export default function AboutUs() {
    document.title = 'Sobre nós | Educathon'

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    Sobre
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
