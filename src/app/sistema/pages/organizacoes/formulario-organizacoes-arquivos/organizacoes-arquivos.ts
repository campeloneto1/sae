import { ArquivoTipo } from "../../arquivos-tipos/arquivos-tipos";

export interface OrganizacaoArquivo{
    id?: number,
    arquivo_tipo_id: number,
    arquivo_tipo: ArquivoTipo,
    organizacao_id: number,
    nome: string,
    arquivo: string,
    pivot: any,
}

export type OrganizacoesArquivos = Array<OrganizacaoArquivo>;