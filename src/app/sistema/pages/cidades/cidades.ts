import { Estado } from "../estados/estados";

export interface Cidade{
    id?: number,
    nome: string,
    estado: Estado,
    estado_id: number
}

export type Cidades = Array<Cidade>;