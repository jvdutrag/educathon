import {
    Card, Typography, CardActions, Button,
    CardContent, Divider, Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Quiz } from '../../types'
import { dateFormat, dateHumanize } from '../../utils'

import routes from '../../routes'

type QuizCardProps = {
    quiz: Quiz
    expired?: boolean
    onClickDetailsButton: () => void
    onClickExpireQuizButton?: () => void

}

export function QuizCard({ quiz, expired, onClickExpireQuizButton, onClickDetailsButton }: QuizCardProps) {
    const navigate = useNavigate()

    const navigateToQuizAnswers = () => {
        return navigate(routes.QUIZ_ANSWERS.replace(':id', quiz.id))
    }

    if (!quiz) {
        return null
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ float: 'right' }}>
                        <Typography variant="h6">
                            Cód: {quiz.code}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            {quiz.name}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    <strong>Escola:</strong> {quiz.school?.name}
                </Typography>
                {
                    expired ? (
                        <Typography variant="body2" color="error">
                            Encerrou em {dateFormat(quiz.ends_at)}
                        </Typography>
                    ) : (
                        <Typography variant="body2" fontWeight="bold">
                            Encerra em {dateHumanize(quiz.ends_at)}
                        </Typography>
                    )
                }
            </CardContent>
            <Divider />
            <CardActions sx={{ padding: 2 }}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickDetailsButton}
                >
                    Detalhes
                </Button>
                <Button
                    color="info"
                    variant="contained"
                    onClick={navigateToQuizAnswers}
                >
                    Ver respostas
                </Button>
                {
                    !expired && (
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => onClickExpireQuizButton ? onClickExpireQuizButton() : null}
                        >
                            Encerrar
                        </Button>
                    )
                }
            </CardActions>
        </Card>
    )
}
