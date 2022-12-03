import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Token } from '../models'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>
    ) {}

    async findOne(value: string): Promise<Token> {
        const token = await this.tokenRepository.findOneBy({ value })

        if (!token) {
            return null
        }

        if (token.expires_at < new Date()) {
            await this.delete(token)
            return null
        }

        return token
    }

    async delete(token: Token): Promise<void> {
        await this.tokenRepository.remove(token)
    }

    async save(token: Token): Promise<Token> {
        return this.tokenRepository.save(token)
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.tokenRepository.delete({ user_id: userId })
    }
}
