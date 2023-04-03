import { ArquivoTipo } from "../../arquivos-tipos/arquivos-tipos";

export interface VeiculoArquivo{
    id?: number,
    arquivo_tipo_id: number,
    arquivo_tipo: ArquivoTipo,
    veiculo_id: number,
    nome: string,
    arquivo: string,
    pivot: any,
}

export type VeiculosArquivos = Array<VeiculoArquivo>;