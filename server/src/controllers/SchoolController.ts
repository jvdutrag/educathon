import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common'

import { Request } from '../types'
import { SchoolService } from '../services'
import { School } from '../models'
import { JwtAuthGuard } from '../guards'

@Controller('api/school')
export class SchoolController {
    constructor(
        private schoolService: SchoolService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('find-by-user')
    async create(@Req() req: Request): Promise<School[]> {
        const userId = req.user.id

        return this.schoolService.findByUser(userId)
    }
    
    @Get(':id')
    async findById(@Param('id') id: string): Promise<School> {
        return this.schoolService.findById(id)
    }
}


