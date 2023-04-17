import { ArquivoTipo } from "../../arquivos-tipos/arquivos-tipos";

export interface InvestigacaoSocialArquivo {
    id?: number,
    arquivo_tipo_id: number,
    arquivo_tipo: ArquivoTipo,
    investigacao_social_id: number,
    nome: string,
    arquivo: string,
    pivot: any,
}

export type InvestigacoesSociaisArquivos = Array<InvestigacaoSocialArquivo>;