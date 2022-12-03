import { Injectable, BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from '../services'
import { User } from '../models'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, secret: string): Promise<User> {
        const user = await this.authService.validateUser(email, secret)

        if (!user) {
            throw new BadRequestException({ message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' })
        }

        return user
    }
}
