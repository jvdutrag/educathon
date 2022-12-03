import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectToken } from '../features/auth/authSlice'

export function useIsLogged() {
  const [isLogged, setIsLogged] = useState(false)
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [token])

  return isLogged
}
