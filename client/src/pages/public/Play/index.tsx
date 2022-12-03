import { useEffect, useState } from 'react'
import {
    Container, Grid, GlobalStyles, Card, CardContent, Box
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Logo } from '../../../components/default'
import { PlayForm } from '../../../components/forms'
import { useAlert } from '../../../hooks'
import { Quiz, Student } from '../../../types'

import { useFindByCodeMutation } from '../../../features/quiz/quizApiSlice'

import PlayQuiz from './PlayQuiz'

export default function Play() {
    const theme = useTheme()
    const alert = useAlert()

    const [student, setStudent] = useState<Student>({
        internalId: '',
        name: ''
    })

    const [quizReady, setQuizReady] = useState(false)

    const [findByCode, { isLoading, data: quiz, isSuccess }] = useFindByCodeMutation()

    const onFormSubmit = (data: any) => {
        setStudent({
            internalId: data.internalId,
            name: data.name
        })

        findByCode(data.code)
    }

    useEffect(() => {
        if (isSuccess && quiz) {
            setQuizReady(true)
        }

        if (isSuccess && !quiz) {
            alert('Quiz não encontrado!', 'error')
        }
    }, [quiz, isSuccess, alert])

    return (
        <Container maxWidth={false}>
            <GlobalStyles
                styles={{
                    body: {
                        backgroundColor: theme.palette.primary.main
                    }
                }}
            />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
                spacing={0}
            >
                {
                    quizReady ? (
                        <PlayQuiz
                            quiz={quiz ? quiz : new Quiz()}
                            student={student ? student : new Student()}
                        />
                    ) : (
                        <Grid item md={4} xs={12}>
                            <Card variant="outlined">
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Box sx={{ width: '350px' }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Logo color="primary" large />
                                        </Box>
                                        <Box>
                                            <PlayForm
                                                onSubmit={onFormSubmit}
                                                isLoading={isLoading}
                                            />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}
