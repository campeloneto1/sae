export interface PessoaVeiculo{
    id?: number,
    pessoa_id: number,
    veiculo_id: number,
}

export type PessoasVeiculos = Array<PessoaVeiculo>;