export interface OrganizacaoVeiculo{
    id?: number,
    veiculo_id: number,
    organizacao_id: number,
}

export type OrganizacoesVeiculos = Array<OrganizacaoVeiculo>;