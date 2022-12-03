import { Grid, Typography, Button, Box } from '@mui/material'
import { CheckCircle as CheckIcon } from '@mui/icons-material'

import { Quiz } from '../../types'

import CustomDialog from './CustomDialog'

import { dateFormat } from '../../utils'

type CreateQuizDialogProps = {
    open: boolean
    quiz: Quiz | null
    create?: boolean
    disabled?: boolean
    onConfirm: () => void
    onClose: () => void
}

export default function CreateQuizDialog({ open, onClose, onConfirm, quiz, create, disabled }: CreateQuizDialogProps) {
    if (!quiz) {
        return null
    }

    return (
        <CustomDialog
            title={create ? 'Revise seu quiz' : `Quiz - ${quiz.code}`}
            open={open}
            onClose={onClose}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Título:</strong> {quiz.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Escola:</strong> {quiz.school?.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Data limite para resposta:</strong> {dateFormat(quiz.ends_at)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Número de perguntas:</strong> {quiz.questions.length}
                    </Typography>
                </Grid>
                <Box sx={{ borderTop: '1px solid lightgray', width: '100%', mt: 1, mb: 1 }} />
                <Grid item xs={12}>
                    <ol type="1" style={{ margin: 0 }}>
                        {
                            quiz.questions.map((question, index) => ((
                                <li key={index}>
                                    <Typography variant="body1">
                                        {question.text}
                                    </Typography>
                                    <ol type="A" style={{ margin: 0 }}>
                                        {
                                            question.alternatives.map((alternative, index) => (
                                                <li key={index}>
                                                    {alternative.text}
                                                    {alternative.correct && <CheckIcon sx={{ color: 'green', ml: 1, fontSize: 18 }} />}
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </li>
                            )))
                        }
                    </ol>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ float: 'right' }}>
                        <Button color="primary" variant="text" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" variant="contained" onClick={onConfirm} disabled={disabled}>
                            {create ? 'Criar' : 'OK'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </CustomDialog>
    )
}
