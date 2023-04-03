import { ArquivoTipo } from "../../arquivos-tipos/arquivos-tipos";

export interface AnaliseArquivo{
    id?: number,
    arquivo_tipo_id: number,
    arquivo_tipo: ArquivoTipo,
    analise_id: number,
    nome: string,
    arquivo: string,
    pivot: any,
}

export type AnalisesArquivos = Array<AnaliseArquivo>;