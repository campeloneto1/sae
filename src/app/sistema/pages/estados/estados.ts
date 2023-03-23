import { Pais } from "../paises/paises";

export interface Estado{
    id?: number,
    nome: string,
    uf: string,
    pais: Pais,
    pais_id: number
}

export type Estados = Array<Estado>;