import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from '../features/auth/authSlice'

export function useUser(): any {
  const hasUser = useSelector(selectUser)

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (hasUser) {
        setUser(hasUser)
    } else {
        setUser(null)
    }
  }, [hasUser])

  return user
}
