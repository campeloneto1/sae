
import { CgdEnvolvimentoTipo } from "../../cgds-envolvimentos-tipos/cgds-envolvimentos-tipos";
import { CgdProcessoTipo } from "../../cgds-processos-tipos/cgds-processos-tipos";
import { CgdSituacaoTipo } from "../../cgds-situacoes-tipos/cgds-situacoes-tipos";
import { InvestigacaoSocial } from "../investigacoes-sociais";

export interface InvestigacaoSocialCgd{
    id?: number,
    investigacao_social_id: number,
    investigacao_social: InvestigacaoSocial,
    cgd_envolvimento_tipo_id: number,
    cgd_envolvimento_tipo: CgdEnvolvimentoTipo,
    cgd_processo_tipo_id: number,
    cgd_processo_tipo: CgdProcessoTipo,
    cgd_situacao_tipo_id: number,
    cgd_situacao_tipo: CgdSituacaoTipo,
    spu: string,
    descricao: string,

    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociaisCgds = Array<InvestigacaoSocialCgd>;