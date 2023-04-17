import { Companhia } from "../companhias/companhias";
import { Comportamento } from "../comportamentos/comportamentos";
import { Graduacao } from "../graduacoes/graduacoes";
import { InvestigacaoSocialStatus } from "../investigacoes-sociais-status/investigacoes-sociais-status";
import { Pessoa } from "../pessoas/pessoas";
import { SituacaoFuncional } from "../situacoes-funcionais/situacoes-funcionais";
import { SituacaoTipo } from "../situacoes-tipos/situacoes-tipos";
import { Usuario } from "../usuarios/usuarios";
import { InvestigacoesSociaisArquivos } from "./formulario-investigacoes-sociais-arquivos/investigacoes-sociais-arquivos";
import { InvestigacoesSociaisBoletins } from "./formulario-investigacoes-sociais-boletins/investigacoes-sociais-boletins";
import { InvestigacoesSociaisCgds } from "./formulario-investigacoes-sociais-cgds/investigacoes-sociais-cgds";
import { InvestigacoesSociaisLotacoes } from "./formulario-investigacoes-sociais-lotacoes/investigacoes-sociais-lotacoes";

export interface InvestigacaoSocial{
    id?: number,
    pessoa_id: number,
    pessoa: Pessoa,
    nome_guerra?: string,
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

    lotacoes?: InvestigacoesSociaisLotacoes,
    boletins?: InvestigacoesSociaisBoletins,
    cgds?: InvestigacoesSociaisCgds,
    sip?: string,
    sinesp?: string,
    tjce?: string,
    fontes_abertas?: string,
    informacoes_adicionais?: string,
    arquivos: InvestigacoesSociaisArquivos

    investigacao_social_status_id: number,
    investigacao_social_status: InvestigacaoSocialStatus,
    bcg_transferencia: string,
    data: Date,
    indicou_id: number,
    indicou: Pessoa,
    encaminhou_id: number,
    encaminhou: Usuario,

    created_at: Date,
    updated_at: Date
}

export type InvestigacoesSociais = Array<InvestigacaoSocial>;