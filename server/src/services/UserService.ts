import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User, School } from '../models'
import { UserDto } from '../dtos'
import { SchoolRole } from '../types'

import { SchoolService } from './SchoolService'
import { TokenService } from './TokenService'

import Util from '../utils'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private schoolService: SchoolService,
        private tokenService: TokenService
    ) {}

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return null
        }

        return user
    }

    async create(dto: UserDto, school?: School): Promise<User> {
        const object = new User()

        object.name = dto.name
        object.email = dto.email
        object.document = dto.document
        object.secret = await Util.generateSecretHash(dto.password)

        const user = await this.userRepository.save(object)

        if (school) {
            await this.schoolService.addUserToSchool(school, user, 'OWNER')
        }

        return user
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email })
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.softDelete(id)
        await this.tokenService.deleteByUserId(id)
    }
}
