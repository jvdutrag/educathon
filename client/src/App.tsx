
import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { ModalProvider } from 'react-modal-hook'
import { TransitionGroup } from 'react-transition-group'
import { IoProvider } from 'socket.io-react-hook'

import {
  Home, Login, Register, AboutUs, Support, Play,
  Settings, SchoolList, SchoolView, QuizList, CreateQuiz
} from './pages'
import { Layout, ProtectionFilter } from './components'

import theme from './theme'
import routes from './routes'

import './app.css'

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IoProvider>
          <SnackbarProvider maxSnack={3}>
            <ModalProvider rootComponent={TransitionGroup}>
              <Routes>
                {/* Routes Without Layout */ }
                <Route element={<Layout />}>
                  <Route path={routes.PLAY} element={<Play />} />
                </Route>

                {/* Routes with Base Layout */}
                <Route path={routes.HOME} element={<Layout includeBaseLayout={true} />}>
                  {/* Public Routes */}
                  <Route index element={<Home />} />
                  <Route path={routes.LOGIN} element={<Login />} />
                  <Route path={routes.REGISTER} element={<Register />} />
                  <Route path={routes.ABOUT_US} element={<AboutUs />} />
                  <Route path={routes.SUPPORT} element={<Support />} />
                  <Route path={routes.SCHOOL_VIEW} element={<SchoolView />} />

                  {/* Private Routes */}
                  <Route element={<ProtectionFilter />}>
                    <Route path={routes.USER_SETTINGS} element={<Settings />} />
                    <Route path={routes.SCHOOL_LIST} element={<SchoolList />} />
                    <Route path={routes.QUIZ_LIST} element={<QuizList />} />
                    <Route path={routes.QUIZ_CREATE} element={<CreateQuiz />} />
                  </Route>
                </Route>
              </Routes>
            </ModalProvider>
          </SnackbarProvider>
        </IoProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
