import { Time } from "@angular/common";
import { AnaliseCategoria } from "../analises-categorias/analises-categorias";
import { AnaliseTipo } from "../analises-tipos/analises-tipos";
import { Cidade } from "../cidades/cidades";
import { Estado } from "../estados/estados";
import { Pais } from "../paises/paises";

export interface Analise{
    id?: number,
    nome: string,
    data: Date,
    hora: Time,
    analise_categoria_id: number,
    analise_categoria: AnaliseCategoria,
    analise_tipo_id?: number,
    analise_tipo?: AnaliseTipo,
    cep?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    pais_id?: number,
    pais?: Pais,
    estado_id?: number,
    estado?: Estado,
    cidade_id?: number,
    cidade?: Cidade,
    observacao?: string,
    previa?: string,
    sintese?: string,
    pivot: any


}

export type Analises = Array<Analise>;