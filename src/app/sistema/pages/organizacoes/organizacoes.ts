import { Cidade } from "../cidades/cidades";
import { Estado } from "../estados/estados";
import { OrganizacaoTipo } from "../organizacoes-tipos/organizacoes-tipos";
import { Pais } from "../paises/paises";

export interface Organizacao{
    id?: number,
    nome: string,
    organizacao_tipo_id: number,
    organizacao_tipo: OrganizacaoTipo,
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
    pivot: any
}

export type Organizacoes = Array<Organizacao>;