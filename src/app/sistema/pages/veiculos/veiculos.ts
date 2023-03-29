import { Analises } from "../analises/analises";
import { Cor } from "../cores/cores";
import { Modelo } from "../modelos/modelos";
import { Organizacao, Organizacoes } from "../organizacoes/organizacoes";
import { Pessoa, Pessoas } from "../pessoas/pessoas";
import { VeiculosArquivos } from "./formulario-veiculos-arquivos/veiculos-arquivos";

export interface Veiculo{
    id?: number,
    placa: string,
    renavam?: string,
    chassi?: string,
    cor_id?: number,
    cor?: Cor,
    modelo_id?: number,
    modelo?: Modelo,
    veiculo_tipo_id?: string,
    veiculo_tipo?: any,
    pessoa_id?: number,
    pessoa?: Pessoa,
    organizacao_id?: number,
    organizacao?: Organizacao,
    pessoas?: Pessoas,
    analises?: Analises,
    organizacoes?: Organizacoes,
    arquivos: VeiculosArquivos,
    pivot?: any,
    observacao?: string

}

export type Veiculos = Array<Veiculo>;