import { Typography, Grid } from '@mui/material'

import { Image } from '../../../components'

import WelcomeImage from '../../../assets/vectors/welcome.png'

export default function Home() {
    document.title = 'Educathon - Um novo jeito de aprender'

    return (
        <Grid container alignItems="center">
            <Grid item md={4} xs={12}>
                <Typography color="primary" variant="h3" sx={{ textAlign: { xs: 'center', md: 'right' }, fontWeight: 'bold', mb: 2 }}>
                    Um novo jeito de aprender
                </Typography>
                <Typography variant="body1" sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                    Estimule seus alunos em sala de aula a aprender de forma competitiva e tecnológica. Crie desafios através de quizes interativos e em tempo real.
                </Typography>
            </Grid>
            <Grid item md={8} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={WelcomeImage} sx={{ maxWidth: '600px', width: '100%', height: 'auto' }} />
            </Grid>
        </Grid>
    )
}
