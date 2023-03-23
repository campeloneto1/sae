import { Cidade } from "../cidades/cidades";
import { Estado } from "../estados/estados";
import { Influencia } from "../influencias/influencias";
import { Pais } from "../paises/paises";
import { Sexo } from "../sexos/sexos";

export interface Pessoa{
    id?: number,
    nome: string,
    alcunha?: string,
    cpf: string,
    data_nascimento?: Date,
    mae?: string,
    pai?: string,
    sexo_id?: number,
    sexo?: Sexo,
    influencia_id?: number,
    influencia?: Influencia,
    telefone1?: string,
    telefone2?: string,
    email?: string,
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
    foto?: string,
    key?: string,
}

export type Pessoas = Array<Pessoa>;