export interface PessoaRedeSocial{
    id?: number,
    pessoa_id: number,
    rede_social_id: number,
    nome: string
    

}

export type PessoasRedesSociais = Array<PessoaRedeSocial>;