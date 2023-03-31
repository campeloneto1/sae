export interface ArquivoTipo{
    id?: number,
    nome: string,
    audio: boolean,
    texto: boolean,
    video: boolean,
    foto: boolean,
    pdf: boolean
}

export type ArquivosTipos = Array<ArquivoTipo>;