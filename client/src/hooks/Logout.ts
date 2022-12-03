import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../features/auth/authApiSlice'

import routes from '../routes'

export function useLogout() {
    const navigate = useNavigate()

    const [logout, {
        isSuccess
    }] = useLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate(routes.HOME)
        }
    }, [isSuccess, navigate])

  return logout
}
