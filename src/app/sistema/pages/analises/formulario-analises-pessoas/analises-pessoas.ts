export interface AnalisePessoa{
    id?: number,
    pessoa_id: number,
    analise_id: number,
    lider: boolean
}

export type AnalisesPessoas = Array<AnalisePessoa>;