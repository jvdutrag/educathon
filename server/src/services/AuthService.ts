import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User, Token } from '../models'
import { AuthResponse } from '../types'
import { RegisterDto, UserDto } from '../dtos'

import { UserService } from './UserService'
import { TokenService } from './TokenService'
import { SchoolService } from './SchoolService'

import Util from '../utils'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
    private schoolService: SchoolService
  ) {}

  async validateUser(email: string, secret: string): Promise<User> {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      return null
    }

    const isPasswordValid = await Util.compare(secret, user.secret)

    if (isPasswordValid) {
      const { secret, ...destructuredUser } = user
      return destructuredUser
    }

    return null
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const decoded = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      })

      if (typeof decoded === 'string') {
        throw new Error()
      }
    } catch (error) {
      throw new BadRequestException('Invalid Refresh Token - 1')
    }

    const token = await this.tokenService.findOne(refreshToken)

    if (!token) {
      throw new BadRequestException('Invalid Refresh Token - 2')
    }

    const user = await this.userService.findById(token.user_id)

    if (!user) {
      throw new NotFoundException('User Not Found')
    }

    const payload = {
      sub: token.user_id
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
    })

    return {
      access_token: accessToken,
      user
    }
  }

  async logout(refreshToken: string): Promise<void> {
    const token = await this.tokenService.findOne(refreshToken)

    if (!token) {
      throw new NotFoundException('Invalid Refresh Token')
    }

    await this.tokenService.delete(token)
  }

  async login(user: User, ip: string, userAgent: string): Promise<AuthResponse> {
    const payload = {
      sub: user.id
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET
    })

    const token = new Token()

    token.user_id = user.id
    token.user_agent = userAgent
    token.user_ip_address = ip
    token.value = refreshToken
    
    await this.tokenService.save(token)

    const updatedUser = await this.userService.findById(user.id)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: updatedUser
    }
  }

  async register(dto: RegisterDto): Promise<User> {
    const emailIsTaken = await this.userService.findByEmail(dto.email)

    if (emailIsTaken) {
      throw new BadRequestException({ message: 'Email already exists', code: 'EMAIL_IS_TAKEN' })
    }

    const school = await this.schoolService.create(dto.cnpj)
    const user = await this.userService.create(dto as UserDto, school)

    return user
  }
}