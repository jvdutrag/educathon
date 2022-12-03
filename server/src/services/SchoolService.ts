import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CnpjService } from './CnpjService'

import { School, User } from '../models'
import { SchoolRole } from '../types'

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>,

        private cnpjService: CnpjService
    ) {}

    async findById(id: string): Promise<School> {
        const school = await this.schoolRepository.findOne({
            where: { id },
            relations: ['owner']
        })

        if (!school) {
            return null
        }

        return school
    }

    async findByCnpj(cnpj: string): Promise<School> {
        const result = await this.schoolRepository.findOneBy({ cnpj })

        if (!result) {
            return null
        }

        return result
    }

    async create(cnpj: string): Promise<School> {
        const exists = await this.findByCnpj(cnpj)

        if (exists) {
            return exists
        }

        const info = await this.cnpjService.findByCnpj(cnpj)

        const school = new School()
        school.cnpj = info.cnpj
        school.name = info.trade_name
        school.company_name = info.name

        const created = await this.schoolRepository.save(school)

        return created
    }

    async findByUser(userId: string): Promise<School[]> {
        const ownerList = (await this.schoolRepository.find({
            where: {
                owner: {
                    id: userId
                }
            },
            relations: ['owner']
        })).map(school => ({
            ...school,
            is_owner: true
        }))

        const staffList = (await (this.schoolRepository.find({
            relations: ['staff']
        })))
        .filter(school => school.staff.map(u => u.id).includes(userId))

        return [...ownerList, ...staffList]
    }

    async addUserToSchool(school: School, user: User, role: SchoolRole): Promise<School> {
        switch (role) {
            case 'OWNER': {
                school.owner = user
                break
            }
            case 'STAFF': {
                school.staff.push(user)
                break
            }
            default: break
        }

        const saved = await this.schoolRepository.save(school)

        return saved
    }

    async removeUserFromStaff(school: School, user: User): Promise<School> {
        school.staff = school.staff.filter(u => u.id !== user.id)

        const saved = await this.schoolRepository.save(school)

        return saved
    }

    async isUserStaff(school: School, user: User): Promise<boolean> {
        if (school.owner.id === user.id || school.staff.map(u => u.id).includes(user.id)) {
            return true
        }

        return false
    }
}
