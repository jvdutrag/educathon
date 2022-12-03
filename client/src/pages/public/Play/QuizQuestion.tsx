import { Grid, Typography, Button, Box } from '@mui/material'

import { Question } from '../../../types'

type QuizQuestionProps = {
    question: Question
    onAlternativeSelected: (alternative: string) => void
    selectedAlternative?: string
}

export default function QuizQuestion({ question, selectedAlternative, onAlternativeSelected }: QuizQuestionProps) {
    const handleSelectAlternative = (id: string) => {
        onAlternativeSelected(id)
    }

    const isAlternativeSelected = (id: string) => {
        return selectedAlternative === id
    }

    return (
        <Grid container sx={{ m: 1 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h6">
                    {question.text}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {
                    question.alternatives.map((alternative, index) => (
                        <Button
                            key={index}
                            fullWidth
                            variant={isAlternativeSelected(alternative.id) ? 'contained' : 'outlined'}
                            sx={{
                                justifyContent: 'flex-start',
                                mb: 1
                            }}
                            onClick={() => handleSelectAlternative(alternative.id)}
                        >
                            <Box
                                sx={{
                                    bgcolor: isAlternativeSelected(alternative.id) ? 'secondary.main' : 'primary.main',
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    color: isAlternativeSelected(alternative.id) ? 'black' : 'white',
                                    mr: 1
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Typography variant="body1">
                                {alternative.text}
                            </Typography>
                        </Button>
                    ))
                }
            </Grid>
        </Grid>
    )
}
