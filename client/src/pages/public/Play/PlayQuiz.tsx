import { useState } from 'react'
import {
    Grid, Card, CardContent, Box, Stepper, 
    Step, StepButton, Typography, Button
} from '@mui/material'
import {
    ArrowForward as NextIcon
} from '@mui/icons-material'

import { Quiz, Student } from '../../../types'
import { QuestionAnswerDto, AnswerDto } from '../../../dtos'

import QuizQuestion from './QuizQuestion'

type PlayQuizProps = {
    quiz: Quiz,
    student: Student
}

export default function PlayQuiz({ quiz, student }: PlayQuizProps) {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [completedList, setCompletedList] = useState<{
        [k: number]: boolean
    }>({})

    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerDto[]>(
        quiz.questions.map(question => ({
            id: question.id,
            alternativeId: ''
        }))
    )

    const [isQuizCompleted, setIsQuizCompleted] = useState(false)

    const totalQuestions = () => {
        return quiz.questions.length
    }

    const completedQuestions = () => {
        return Object.keys(completedList).length
    }

    const isLastQuestion = () => {
        return activeQuestion === totalQuestions() - 1
    }

    const allQuestionsCompleted = () => {
        return completedQuestions() === totalQuestions()
    }

    const handleNext = () => {
        const newActiveQuestion = isLastQuestion() && !allQuestionsCompleted()
            ? quiz?.questions.findIndex((_, i) => !(i in completedList))
            : activeQuestion + 1

        setActiveQuestion(newActiveQuestion)
    }

    const handleBack = () => {
        setActiveQuestion((prevactiveQuestion) => prevactiveQuestion - 1)
    }

    const handleQuestion = (step: number) => () => {
        setActiveQuestion(step)
    }

    const handleComplete = (goToNext?: boolean) => {
        const newCompleted = completedList
        newCompleted[activeQuestion] = true
        setCompletedList(newCompleted)
        
        if (goToNext) {
            handleNext()
        }
    }

    const onAlternativeSelected = (questionId: string, alternativeId: string) => {
        const newQuestionAnswers = questionAnswers.map(questionAnswer => {
            if (questionAnswer.id === questionId) {
                return {
                    ...questionAnswer,
                    alternativeId
                }
            }
            return questionAnswer
        })

        setQuestionAnswers(newQuestionAnswers)
        handleComplete()
    }

    const isQuestionAnswered = () => {
        return completedList[activeQuestion]
    }

    const handleQuizCompleted = () => {
        const payload: AnswerDto = {
            student: {
                name: student.name,
                internalId: student.internalId
            },
            quizId: quiz.id,
            questions: questionAnswers
        }

        console.log(payload)
        setIsQuizCompleted(true)
    }

    if (!quiz) {
        return null
    }

    return (
        <Grid item md={9} xs={12}>
            <Card variant="outlined" sx={{ border: '3px solid', borderColor: 'secondary.main' }}>
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">
                                {quiz.name}
                            </Typography>
                            <Typography variant="body1">
                                Respondendo como <strong>{student.name}</strong> ({student.internalId})
                            </Typography>
                        </Box>
                        <Stepper nonLinear activeStep={activeQuestion}>
                            {quiz?.questions.map((_, index) => (
                                <Step
                                    key={index}
                                    completed={completedList[index]}
                                >
                                    <StepButton
                                        onClick={handleQuestion(index)}
                                    />
                                </Step>
                            ))}
                        </Stepper>
                        {
                            isQuizCompleted ? (
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">
                                        Você respondeu todas as questões!
                                    </Typography>
                                </Box>
                            ) : (
                                <QuizQuestion
                                    question={quiz.questions[activeQuestion]}
                                    selectedAlternative={questionAnswers.find(qa => qa.id === quiz.questions[activeQuestion].id)?.alternativeId}
                                    onAlternativeSelected={(id: string) => onAlternativeSelected(quiz.questions[activeQuestion].id, id)}
                                />
                            )
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {
                                !isQuizCompleted && (
                                    <Button
                                        color="inherit"
                                        disabled={activeQuestion === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Anterior
                                    </Button>
                                )
                            }
                            <Box sx={{ flex: '1 1 auto' }} />
                            {
                                !isQuizCompleted && (
                                    <Button
                                        onClick={() => {
                                            if (isLastQuestion() && allQuestionsCompleted()) {
                                                handleQuizCompleted()
                                            } else {
                                                handleComplete(true)
                                            }
                                        }}
                                        variant="contained"
                                        disabled={!isQuestionAnswered()}
                                    >
                                        {
                                            isLastQuestion()
                                            ? 'Finalizar'
                                            : (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    Próxima
                                                    <NextIcon sx={{ ml: 1 }} />
                                                </Box>
                                            )
                                        }
                                    </Button>
                                )
                            }
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}
