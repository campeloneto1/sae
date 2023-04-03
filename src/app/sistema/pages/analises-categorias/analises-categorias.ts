export interface AnaliseCategoria{
    id?: number,
    nome: string,
    gestor: boolean,
    restrito: boolean,
    tipo: boolean,
    previa: boolean,
    sintese: boolean,
    endereco: boolean

}

export type AnalisesCategorias = Array<AnaliseCategoria>;