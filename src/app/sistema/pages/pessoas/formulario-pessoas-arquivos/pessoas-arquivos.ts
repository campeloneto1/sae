import { ArquivoTipo } from "../../arquivos-tipos/arquivos-tipos";

export interface PessoaArquivo{
    id?: number,
    arquivo_tipo_id: number,
    arquivo_tipo: ArquivoTipo,
    pessoa_id: number,
    nome: string,
    arquivo: string,
    pivot: any,
}

export type PessoasArquivos = Array<PessoaArquivo>;