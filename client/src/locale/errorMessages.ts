export function getErrorMessageByCode(code: string): string {
    switch (code) {
        case 'INVALID_CREDENTIALS': return 'E-mail/usuário ou senha inválidos'
        case 'USERNAME_IS_TAKEN': return 'Usuário já cadastrado'
        case 'EMAIL_IS_TAKEN': return 'E-mail já cadastrado'
        default: return 'Erro ao processar sua requisição. Tente novamente mais tarde'
    }
}
