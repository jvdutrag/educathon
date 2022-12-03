import { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Loader } from '../../../components/default'

import { useFindSchoolByIdMutation } from '../../../features/school/schoolApiSlice'

import DefaultImage from '../../../assets/vectors/default.jpg'

export default function SchoolView() {
    document.title = 'Ver escola | Educathon'

    const params = useParams()

    const schoolId = params.id

    const [findSchoolById, { isLoading, isError, data: school }] = useFindSchoolByIdMutation()

    useEffect(() => {
        if (schoolId) {
            findSchoolById(schoolId)
        }
    }, [findSchoolById, schoolId])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (isError) {
        return (
            <Typography variant="body1">
                Erro ao encontrar a escola
            </Typography>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <img
                    src={school?.picture || DefaultImage}
                    alt="School"
                    style={{
                        width: '100%',
                        height: '300px',
                        objectPosition: 'center',
                        objectFit: 'cover'
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                    {school?.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    {school?.description}
                </Typography>
            </Grid>
        </Grid>
    )
}
