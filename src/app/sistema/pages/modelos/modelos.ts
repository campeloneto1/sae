import { Marca } from "../marcas/marcas";

export interface Modelo{
    id?: number,
    nome: string,
    marca_id: number,
    marca: Marca
}

export type Modelos = Array<Modelo>;