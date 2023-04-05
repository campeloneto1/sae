import { Batalhao } from "../batalhoes/batalhoes";

export interface Companhia{
    id?: number,
    nome: string,
    abreviatura: string,
    batalhao: Batalhao,
    batalhao_id: number
}

export type Companhias = Array<Companhia>;