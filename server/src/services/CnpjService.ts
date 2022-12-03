import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { CnpjResponse } from '../types'

@Injectable()
export class CnpjService {
    constructor() {}

    async findByCnpj(cnpj: string): Promise<CnpjResponse> {
        const url = `https://publica.cnpj.ws/cnpj/${cnpj}`

        const result = await axios.get(url)

        const data: CnpjResponse = {
            cnpj,
            name: result.data.razao_social,
            trade_name: result.data.estabelecimento.nome_fantasia
        }

        return data
    }
}
