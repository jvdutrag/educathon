import React, { useState, useEffect, useCallback } from 'react'
import {
    Grid, Typography, TextField, Card, CardContent, Button, 
    Checkbox, FormGroup, FormControlLabel, Box, AppBar, Toolbar,
    Fab, FormControl, InputLabel, MenuItem, Select, FormHelperText
} from '@mui/material'
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Check as CheckIcon
} from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useModal } from 'react-modal-hook'
import { useNavigate } from 'react-router-dom'

import { Alternative, Question } from '../../../types'
import { QuizDto } from '../../../dtos'
import { useIsLogged } from '../../../hooks'
import { QuizDialog } from '../../../components/dialogs'

import { useCreateQuizMutation } from '../../../features/quiz/quizApiSlice'
import { useFindUserSchoolsMutation } from '../../../features/school/schoolApiSlice'

import routes from '../../../routes'

type QuestionElementProps = {
    questionIndex: number
    questionsLength: number
    isError: boolean
    onClickAddQuestion: () => void
    onClickRemoveQuestion: () => void
    onChangeQuestionText: (text: string) => void
    onChangeQuestionPoints: (points: number) => void
    onUpdateAlternatives: (alternatives: Alternative[]) => void
}

const QuestionElement = ({
    questionsLength, questionIndex, onClickAddQuestion, onChangeQuestionText,
    onUpdateAlternatives, onClickRemoveQuestion, onChangeQuestionPoints, isError
}: QuestionElementProps) => {
    const [alternatives, setAlternatives] = useState<Alternative[]>([
        { id: '1', text: '', correct: false },
        { id: '2', text: '', correct: false }
    ])

    const updateAlternative = (alternativeId: string, key: string, value: string | boolean) => {
        setAlternatives((prev) =>
            prev.map((alternative) => {
                if (alternative.id === alternativeId) {
                    return { ...alternative, [key]: value }
                }
                return alternative
            })
        )
    }

    const addAlternative = () => {
        const alternative = {
            id: (alternatives.length + 1).toString(),
            text: '',
            correct: false
        }

        setAlternatives((prev) => [...prev, alternative])
    }

    const removeAlternative = (alternativeId: string) => {
        setAlternatives((prev) => prev.filter((alternative) => alternative.id !== alternativeId))
    }

    useEffect(() => {
        onUpdateAlternatives(alternatives)
        // eslint-disable-next-line
    }, [alternatives])

    return (
        <Box sx={{ mb: 2 }}>
            <Card variant="outlined" sx={{ border: isError ? '1px solid red' : undefined }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ float: 'right' }}>
                                {
                                    questionIndex === questionsLength - 1 && (
                                        <Button color="primary" variant="contained" onClick={onClickAddQuestion}>
                                            <AddIcon />
                                        </Button>
                                    )
                                }
                                {
                                    questionIndex > 0 && (
                                        <Button color="error" variant="contained" onClick={onClickRemoveQuestion} sx={{ ml: 1 }}>
                                            <RemoveIcon />
                                        </Button>
                                    )
                                }
                            </Box>
                            <Typography variant="h6" fontWeight="bold">
                                Pergunta N° {questionIndex + 1}
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Enunciado"
                                color="primary"
                                multiline
                                placeholder="Digite o enunciado da pergunta. Ex: Quanto é 1+1?"
                                onChange={(e) => onChangeQuestionText(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Pontos por acerto"
                                color="primary"
                                onChange={(e) => onChangeQuestionPoints(Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold">
                                Alternativas
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                alternatives.map((alternative, index) => (
                                    <Grid container item xs={12} spacing={2} sx={{ mb: 2 }} key={index}>
                                        <Grid item md={1} xs={3}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Correta"
                                                    onChange={
                                                        (event) => {
                                                            const target = event.target as HTMLInputElement
                                                            updateAlternative(alternative.id, 'correct', target.checked as boolean)
                                                        }
                                                    }
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={9} xs={9}>
                                            <TextField
                                                variant="outlined"
                                                label={`Texto da alternativa ${index + 1}`}
                                                placeholder="Digite o texto da alternativa. Ex: 2"
                                                color="primary"
                                                fullWidth
                                                multiline
                                                onChange={({ target }) => updateAlternative(alternative.id, 'text', target.value)}
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {
                                                index === alternatives.length - 1 && (
                                                        <Button color="primary" variant="outlined" onClick={addAlternative} sx={{ mr: 1 }}>
                                                            <AddIcon />
                                                        </Button>
                                                )
                                            }
                                            {
                                                index > 1 && (
                                                    <Button color="error" variant="outlined" onClick={() => removeAlternative(alternative.id)}>
                                                        <RemoveIcon />
                                                    </Button>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {
                isError && (
                    <Typography variant="caption" color="error">
                        A pergunta possui campos inválidos
                    </Typography>
                )
            }
        </Box>
    )
}

export default function CreateQuiz() {
    document.title = 'Criar quiz | Educathon'

    const isLogged = useIsLogged()
    const navigate = useNavigate()

    const [quiz, setQuiz] = useState<QuizDto>(new QuizDto())

    const [quizError, setQuizError] = useState({
        name: false,
        endsAt: false,
        school: false
    })

    const [questions, setQuestions] = useState<Question[]>([new Question()])
    const [questionsWithError, setQuestionsWithError] = useState<number[]>([])

    const [findUserSchools, { isLoading: isUserSchoolListLoading, data: userSchoolList }] = useFindUserSchoolsMutation()
    const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation()

    const sendPayloadToCreateQuiz = () => {
        createQuiz(quiz).unwrap()
            .then(() => {
                navigate(routes.QUIZ_LIST)
            })
    }

    const [showCreateQuizDialog, hideCreateQuizDialog] = useModal(
        ({ in: open }) => (
            <QuizDialog
                open={open}
                onClose={() => {
                    hideCreateQuizDialog()
                }}
                onConfirm={() => {
                    sendPayloadToCreateQuiz()
                    hideCreateQuizDialog()
                }}
                quiz={{
                    id: '',
                    name: quiz.name,
                    questions: questions.map(question => ({
                        ...question,
                        id: '',
                        alternatives: question.alternatives.map(alternative => ({
                            ...alternative,
                            id: ''
                        }))
                    })),
                    school: userSchoolList?.find(school => school.id === quiz.schoolId),
                    ends_at: quiz.endsAt
                }}
                create={true}
                disabled={isCreatingQuiz}
            />
        ), [quiz, questions, isCreatingQuiz]
    )
    
    useEffect(() => {
        if (isLogged) {
            findUserSchools()
        }
    }, [isLogged, findUserSchools])

    const updateQuestion = (questionId: string, key: string, value: string | Alternative[] | number, index: number) => {
        setQuestions((prev) =>
            prev.map((question) => {
                if (question.id === questionId) {
                    return { ...question, [key]: value }
                }
                return question
            })
        )

        setQuestionsWithError((prev) => {
            if (prev.includes(index)) {
                return prev.filter((item) => item !== index)
            }
            return prev
        })
    }

    const addQuestion = () => {
        const question = {
            id: (questions.length + 1).toString(),
            text: '',
            alternatives: [],
            points: 0
        }

        setQuestions((prev) => [...prev, question])
    }

    const removeQuestion = (questionId: string) => {
        setQuestions((prev) => prev.filter((question) => question.id !== questionId))
    }

    const onQuizSubmit = () => {
        const newQuiz: QuizDto = {
            name: quiz.name,
            endsAt: quiz.endsAt,
            schoolId: quiz.schoolId,
            questions: questions.map((question) => ({
                text: question.text,
                points: question.points,
                alternatives: question.alternatives.map((alternative) => ({
                    text: alternative.text,
                    correct: alternative.correct
                }))
            }))
        }

        const isQuizBodyValid = newQuiz.name !== '' && newQuiz.endsAt !== '' && newQuiz.schoolId !== ''

        if (!isQuizBodyValid) {
            setQuizError({
                name: newQuiz.name === '',
                endsAt: newQuiz.endsAt === '',
                school: newQuiz.schoolId === ''
            })
        }

        let isQuestionsValid = newQuiz.questions.length > 0

        const invalidQuestions = new Set<number>()
    
        newQuiz.questions.forEach(
            (question, index) => {
                const isValid = question.text !== ''
                && question.points > 0
                && question.alternatives.every((alternative) => alternative.text !== '')
                && question.alternatives.some(a => a.correct)
                && question.alternatives.filter(a => a.correct).length === 1

                if (!isValid) {
                    isQuestionsValid = false
                    invalidQuestions.add(index)
                }
            }
        )
        
        setQuestionsWithError(Array.from(invalidQuestions))

        const isValid = isQuizBodyValid && isQuestionsValid

        if (isValid) {
            setQuiz(newQuiz)
            showCreateQuizDialog()
        }
    }

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Fab
                        color="secondary"
                        sx={{
                            position: 'absolute',
                            zIndex: 1,
                            top: {
                                md: -40,
                                xs: -30
                            },
                            left: 0,
                            right: 0,
                            margin: '0 auto'
                        }}
                        onClick={onQuizSubmit}
                    >
                        <CheckIcon />
                    </Fab>
                    <Typography sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
                        Você está criando um novo quiz. Para finalizar, clique no botão acima.
                    </Typography>
                </Toolbar>
            </AppBar>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Grid container sx={{ mb: 10 }} spacing={2}>
                    <Grid item xs={12} sx={{ borderBottom: '1px solid lightgray', mb: 2 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                            Criar quiz
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Vamos começar a criar seu quiz! Preencha os campos abaixo para começar.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Título do quiz"
                            color="primary"
                            placeholder="Descreva um título de fácil identificação"
                            onChange={({ target }) => {
                                setQuizError((prev) => ({ ...prev, name: false }))
                                setQuiz((prev) => ({ ...prev, name: target.value }))
                            }}
                            error={quizError.name}
                            helperText={quizError.name && 'O título do quiz é obrigatório'}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                        <FormControl
                            fullWidth
                            error={quizError.school}
                            disabled={isUserSchoolListLoading}
                        >
                            <InputLabel id="create-quiz-school-label">Escola</InputLabel>
                            <Select
                                labelId="create-quiz-school-label"
                                label="Escola"
                                onChange={({ target }) => {
                                    setQuizError((prev) => ({ ...prev, school: false }))
                                    setQuiz((prev) => ({ ...prev, schoolId: target.value as string }))
                                }}
                                value={quiz.schoolId}
                            >
                                <MenuItem value="" disabled>N/D</MenuItem>
                                {
                                    userSchoolList?.map(school => (
                                        <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{quizError.school && 'A escola é obrigatória'}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Data limite para resposta"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true
                            }}
                            color="primary"
                            onChange={({ target }) => {
                                setQuizError((prev) => ({ ...prev, endsAt: false }))
                                setQuiz((prev) => ({ ...prev, endsAt: target.value }))
                            }}
                            error={quizError.endsAt}
                            helperText={quizError.endsAt && 'A data limite para resposta é obrigatória'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            questions.map((question, index) => (
                                <QuestionElement
                                    key={index}
                                    isError={questionsWithError.includes(index)}
                                    questionIndex={index}
                                    questionsLength={questions.length}
                                    onClickAddQuestion={addQuestion}
                                    onClickRemoveQuestion={() => removeQuestion(question.id)}
                                    onUpdateAlternatives={(alternatives) => updateQuestion(question.id, 'alternatives', alternatives, index)}
                                    onChangeQuestionText={(text) => updateQuestion(question.id, 'text', text, index)}
                                    onChangeQuestionPoints={(points) => updateQuestion(question.id, 'points', points, index)}
                                />
                            ))
                        }
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </React.Fragment>
    )
}
