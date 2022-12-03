import { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import { useModal } from 'react-modal-hook'
import { useNavigate } from 'react-router-dom'

import { useIsLogged } from '../../../hooks'
import { Loader } from '../../../components/default'
import { QuizCard } from '../../../components/cards'
import { ConfirmationDialog, QuizDialog } from '../../../components/dialogs'
import { Quiz } from '../../../types'

import { useFindQuizesMutation, useExpireQuizMutation } from '../../../features/quiz/quizApiSlice'

import routes from '../../../routes'

export default function QuizList() {
    document.title = 'Quizzes | Educathon'

    const isLogged = useIsLogged()
    const navigate = useNavigate()

    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

    const [findQuizes, { isLoading, data: quizList }] = useFindQuizesMutation()
    const [expireQuiz, { isSuccess: isQuizExpired }] = useExpireQuizMutation()

    const [showExpireQuizDialog, hideExpireQuizDialog] = useModal(
        ({ in: open }) => (
            <ConfirmationDialog
                title="Encerrar quiz"
                description="Tem certeza que deseja encerrar este quiz agora?"
                open={open}
                onClose={() => {
                    setSelectedQuiz(null)
                    hideExpireQuizDialog()
                }}
                onConfirm={() => {
                    if (!selectedQuiz) {
                        return
                    }

                    expireQuiz(selectedQuiz.id)
                    hideExpireQuizDialog()
                }}
            />
        ), [selectedQuiz]
    )

    const [showQuizDialog, hideQuizDialog] = useModal(
        ({ in: open }) => (
            <QuizDialog
                open={open}
                onClose={() => {
                    hideQuizDialog()
                }}
                onConfirm={() => {
                    hideQuizDialog()
                }}
                quiz={selectedQuiz}
            />
        ), [selectedQuiz]
    )

    const navigateToCreateQuiz = () => {
        return navigate(routes.QUIZ_CREATE)
    }

    useEffect(() => {
        if (isQuizExpired) {
            window.location.reload()
        }
    }, [isQuizExpired])

    useEffect(() => {
        if (isLogged) {
            findQuizes()
        }
    }, [isLogged, findQuizes])

    return (
        <Grid container>
            <Grid item xs={12} sx={{ borderBottom: '1px solid lightgray', mb: 2 }}>
                <Box sx={{ float: 'right' }}>
                    <Button color="primary" variant="contained" onClick={navigateToCreateQuiz}>
                        Criar quiz
                    </Button>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        Seus quizzes
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Listando todos seus quizzes mais recentes.
                    </Typography>
                </Box>
            </Grid>
            {
                isLoading ? (
                    <Grid item xs={12}>
                        <Loader />
                    </Grid>
                ) : (
                    <Grid container item xs={12}>
                        <Grid item xs={12} sx={{ mb: 3 }}>
                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                                Quizzes ativos
                            </Typography>
                            <Grid container item xs={12} spacing={2}>
                            {
                                quizList?.active.length ? (
                                    quizList?.active.map(quiz => (
                                        <Grid item xs={12} md={4} key={quiz.id}>
                                            <QuizCard
                                                quiz={quiz}
                                                onClickExpireQuizButton={() => {
                                                    setSelectedQuiz(quiz)
                                                    showExpireQuizDialog()
                                                }}
                                                onClickDetailsButton={() => {
                                                    setSelectedQuiz(quiz)
                                                    showQuizDialog()
                                                }}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            Você não possui nenhum quiz ativo.
                                        </Typography>
                                    </Grid>
                                )
                            }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                                Quizzes anteriores
                            </Typography>
                            <Grid container item xs={12} spacing={2}>
                            {
                                quizList?.expired.length ? (
                                    quizList?.expired.map(quiz => (
                                        <Grid item xs={12} md={4} key={quiz.id}>
                                            <QuizCard
                                                expired={true}
                                                quiz={quiz}
                                                onClickDetailsButton={() => {
                                                    setSelectedQuiz(quiz)
                                                    showQuizDialog()
                                                }}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            Não há quizzes anteriores para mostrar.
                                        </Typography>
                                    </Grid>
                                )
                            }
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}
