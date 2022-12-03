import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required('Campo obrigatório'),
    internalId: yup.string().required('Campo obrigatório'),
    code: yup.string().length(6, 'O código precisa ter 6 letras').required('Campo obrigatório')
}).required()

export default schema
