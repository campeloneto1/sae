import { Companhia } from "../../companhias/companhias";
import { LotacaoTipo } from "../../lotacoes-tipos/lotacoes-tipos";
import { InvestigacaoSocial } from "../investigacoes-sociais";

export interface InvestigacaoSocialLotacao{
    id?: number,
    investigacao_social_id: number,
    investigacao_social: InvestigacaoSocial,
    bcg: string,
    lotacao_tipo_id: number,
    lotacao_tipo: LotacaoTipo,
    data: Date,
    companhia_id: number,
    companhia: Companhia,

    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociaisLotacoes = Array<InvestigacaoSocialLotacao>;