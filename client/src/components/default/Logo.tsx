import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

import { Image } from '../default'

import LogoPrimary from '../../assets/logo_s.png'
import LogoSecondary from '../../assets/logo_p.png'

type LogoProps = {
    large?: boolean
    color: 'primary' | 'secondary'
}

export default function Logo({ color, large }: LogoProps) {
    return (
        <Link
            to="/"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
            }}
        >
            <Image
                sx={{
                    height: large ? '60px' : '40px',
                    mr: 1
                }}
                src={color === 'primary' ? LogoPrimary : LogoSecondary}
                alt="Educathon Logo"
            />
            <Typography
                variant={large ? 'h4' : 'h6'}
                noWrap
                sx={{
                    fontWeight: 300
                }}
            >
                educathon
            </Typography>
        </Link>
    )
}