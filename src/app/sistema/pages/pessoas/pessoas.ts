import { Cidade } from "../cidades/cidades";
import { Estado } from "../estados/estados";
import { Influencia } from "../influencias/influencias";
import { Pais } from "../paises/paises";
import { RedesSociais } from "../redes-sociais/redes-sociais";
import { Sexo } from "../sexos/sexos";
import { Veiculos } from "../veiculos/veiculos";

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
    redes_sociais?: RedesSociais,
    veiculos?: Veiculos,


    observacao?: string,
    foto?: string,
    key?: string,
}

export type Pessoas = Array<Pessoa>;