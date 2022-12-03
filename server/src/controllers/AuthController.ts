import { Controller, Req, Post, UseGuards, Res, Body } from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { RealIP } from 'nestjs-real-ip'

import { LocalAuthGuard, RefreshJwtAuthGuard } from '../guards'
import { AuthService } from '../services'
import { Request, AuthResponse } from '../types'
import { User } from '../models'
import { RegisterDto } from '../dtos'

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * Number(process.env.COOKIE_EXPIRATION_IN_DAYS)
}

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @RealIP() ip: string
    ): Promise<AuthResponse> {
        const userAgent = req.headers['user-agent']

        const data = await this.authService.login(req.user, ip, userAgent)

        res.cookie('auth', data.refresh_token, cookieOptions)

        return {
            access_token: data.access_token,
            user: data.user
        }
    }

    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<User> {
        const user = await this.authService.register(dto)
        return user
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
        const refreshToken = req.cookies['auth']

        const data = await this.authService.refresh(refreshToken)

        return {
            access_token: data.access_token,
            user: data.user
        }
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
        const refreshToken = req.cookies['auth']

        await this.authService.logout(refreshToken)
        res.clearCookie('auth', cookieOptions)
    }

}
