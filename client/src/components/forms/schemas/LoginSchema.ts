import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório')
}).required()

export default schema
