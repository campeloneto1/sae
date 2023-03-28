export interface OrganizacaoPessoa{
    id?: number,
    pessoa_id: number,
    organizacao_id: number,
    lider: boolean
}

export type OrganizacoesPessoas = Array<OrganizacaoPessoa>;