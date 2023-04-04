export interface ArquivoTipo{
    id?: number,
    nome: string,
    audio: boolean,
    texto: boolean,
    video: boolean,
    foto: boolean,
    pdf: boolean,
    link: boolean
}

export type ArquivosTipos = Array<ArquivoTipo>;