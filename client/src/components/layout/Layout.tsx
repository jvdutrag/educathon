import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'

import { useRefreshMutation } from '../../features/auth/authApiSlice'
import { selectToken } from '../../features/auth/authSlice'

import Header from './Header'

const BaseLayout = () => {
    return (
        <>
            <Header sx={{ mb: 2 }} />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    )
}

type LayoutProps = {
    includeBaseLayout?: boolean
}

export default function Layout({ includeBaseLayout }: LayoutProps) {
    const firstRender = useRef(true)
    const token = useSelector(selectToken)

    const [refresh] = useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    useEffect(() => {
        if (firstRender.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                await refresh().unwrap()
            }

            if (!token) verifyRefreshToken()
        }

        return () => {
            firstRender.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstRender])

    return includeBaseLayout ? <BaseLayout /> : <Outlet />
}