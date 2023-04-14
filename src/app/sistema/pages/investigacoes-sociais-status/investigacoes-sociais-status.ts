
export interface InvestigacaoSocialStatus{
    id?: number,
    nome: string,

    andamento?: boolean,
    concluido?: boolean,
    encaminhado?: boolean,
    aprovado?: boolean,
    recusado?: boolean,
    aguardando?: boolean,
    transferido?: boolean,
   
    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociaisStatus = Array<InvestigacaoSocialStatus>;