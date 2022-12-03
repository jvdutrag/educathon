import { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'

import { useIsLogged } from '../../../hooks'
import { SchoolCard } from '../../../components/cards'
import { Loader } from '../../../components/default'
import { School } from '../../../types'

import { useFindUserSchoolsMutation } from '../../../features/school/schoolApiSlice'

export default function SchoolList() {
    document.title = 'Escolas | Educathon'

    const isLogged = useIsLogged()

    const [findUserSchools, { isLoading, data: schoolList }] = useFindUserSchoolsMutation()
    
    useEffect(() => {
        if (isLogged) {
            findUserSchools()
        }
    }, [isLogged, findUserSchools])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                    Escolas
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Listando as escolas em que sua conta está cadastrada.
                </Typography>
            </Grid>
            {
                isLoading ? (
                    <Grid item xs={12}>
                        <Loader />
                    </Grid>
                ) : (
                    schoolList?.map((school: School) => (
                        <Grid item xs={12} md={4} key={school.id}>
                            <SchoolCard school={school} />
                        </Grid>
                    ))
                )
            }
        </Grid>
    )
}
