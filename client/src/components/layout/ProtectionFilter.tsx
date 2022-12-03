import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useRefreshMutation } from '../../features/auth/authApiSlice'
import { selectToken } from '../../features/auth/authSlice'

export default function ProtectionFilter() {
    const token = useSelector(selectToken)
    const location = useLocation()

    // eslint-disable-next-line
    const [_, { isError }] = useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    return (isError && !token) ? <Navigate to="/login" state={{ from: location }} replace /> : <Outlet />
}
