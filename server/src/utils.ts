import * as bcrypt from 'bcrypt'

class Util {
    async generateSecretHash(secret: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)

        const hashedSecret = await bcrypt.hash(secret, salt)

        return hashedSecret
    }

    async compare(secret: string, hashedSecret: string): Promise<boolean> {
        return bcrypt.compare(secret, hashedSecret)
    }

    generateRandomString(maxLength: number): string {
        const characters = 'abcdefghijklmnopqrstuvwxyz'
        let result = ''

        for (let i = 0; i < maxLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        return result.toUpperCase()
    }
}

export default new Util()
