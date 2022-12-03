import * as yup from 'yup'
import { cnpj } from 'cpf-cnpj-validator'

const schema = yup.object({
    name: yup.string().required('Campo obrigatório'),
    cnpj: yup.string().test('invalid-cnpj', 'CNPJ inválido', val => val ? cnpj.isValid(val) : false).required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required('Campo obrigatório')
}).required()

export default schema
