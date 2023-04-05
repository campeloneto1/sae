import { Timestamp } from "rxjs";
import { Companhia } from "../companhias/companhias";
import { Comportamento } from "../comportamentos/comportamentos";
import { Graduacao } from "../graduacoes/graduacoes";
import { Pessoa } from "../pessoas/pessoas";
import { SituacaoFuncional } from "../situacoes-funcionais/situacoes-funcionais";
import { SituacaoTipo } from "../situacoes-tipos/situacoes-tipos";

export interface InvestigacaoSocial{
    id?: number,
    pessoa_id: number,
    pessoa: Pessoa,
    matricula?: string,
    numeral?: string,
    data_ingresso?: Date,
    graduacao_id?: number,
    graduacao?: Graduacao,
    companhia_id?: number,
    companhia?: Companhia,
    situacao_funcional_id?: number,
    situacao_funcional?: SituacaoFuncional,
    situacao_tipo_id?: number,
    situacao_tipo?: SituacaoTipo,
    comportamento_id?: number,
    comportamento?: Comportamento,

    sip?: string,
    sinesp?: string,
    tjce?: string,
    fontes_abertas?: string,
    informacoes_adicionais?: string,

    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociais = Array<InvestigacaoSocial>;