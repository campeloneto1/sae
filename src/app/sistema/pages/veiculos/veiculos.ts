import { Cor } from "../cores/cores";
import { Modelo } from "../modelos/modelos";
import { Organizacao } from "../organizacoes/organizacoes";
import { Pessoa } from "../pessoas/pessoas";

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
    pivot: any

}

export type Veiculos = Array<Veiculo>;