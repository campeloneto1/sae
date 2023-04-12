import { VinculoTipo } from "../../vinculos-tipos/vinculos-tipos";

export interface PessoaVinculo{
    id?: number,
    nome: string,
    cpf: string,
    pessoa_id: number,
    vinculo_tipo_id: number,
    vinculo_tipo: VinculoTipo
}

export type PessoasVinculos = Array<PessoaVinculo>;