import {
    Card, CardMedia, Typography, CardActions, Button,
    CardContent, Divider, Chip
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { School } from '../../types'

import routes from '../../routes'

import DefaultImage from '../../assets/vectors/default.jpg'

type SchoolCardProps = {
    school: School
}

export function SchoolCard({ school }: SchoolCardProps) {
    const navigate = useNavigate()

    const navigateToSchool = () => {
        return navigate(routes.SCHOOL_VIEW.replace(':id', school.id))
    }

    if (!school) {
        return null
    }

    return (
        <Card variant="elevation">
            <CardMedia
                component="img"
                height="150"
                image={school.picture || DefaultImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {school.name}
                    {
                        school.is_owner && (<Chip label="ADMINISTRADOR" color="primary" />)
                    }
                </Typography>
            </CardContent>
            {
                school.is_owner && (
                    <>
                        <Divider />
                        <CardActions sx={{ padding: 2 }}>
                            <Button
                                color="primary"
                                variant="text"
                                onClick={navigateToSchool}
                            >
                                Ver
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={navigateToSchool}
                            >
                                Gerenciar
                            </Button>
                        </CardActions>
                    </>
                )
            }
        </Card>
    )
}
