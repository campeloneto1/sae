import { InvestigacaoSocial } from "../investigacoes-sociais";

export interface InvestigacaoSocialBoletim{
    id?: number,
    investigacao_social_id: number,
    investigacao_social: InvestigacaoSocial,
    bcg: string,
    descricao: string,

    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociaisBoletins = Array<InvestigacaoSocialBoletim>;