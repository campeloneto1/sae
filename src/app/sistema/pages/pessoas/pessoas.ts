import { Analises } from "../analises/analises";
import { Cidade } from "../cidades/cidades";
import { CnhCategoria } from "../cnh-categorias/cnh-categorias";
import { Escolaridade } from "../escolaridades/escolaridades";
import { Estado } from "../estados/estados";
import { Influencia } from "../influencias/influencias";
import { Organizacoes } from "../organizacoes/organizacoes";
import { Pais } from "../paises/paises";
import { RedesSociais } from "../redes-sociais/redes-sociais";
import { Sexo } from "../sexos/sexos";
import { Veiculos } from "../veiculos/veiculos";
import { PessoasArquivos } from "./formulario-pessoas-arquivos/pessoas-arquivos";
import { PessoasVinculos } from "./formulario-pessoas-vinculos/pessoas-vinculos";

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

    cnh: string,
    cnh_categoria_id: number,
    cnh_categoria: CnhCategoria,
    escolaridade_id: number,
    escolaridade: Escolaridade,
    naturalidade_id: number,
    naturalidade: Cidade,
    
    vinculos?: PessoasVinculos,
    redes_sociais?: RedesSociais,
    veiculos?: Veiculos,
    analises?: Analises,
    organizacoes?: Organizacoes,
    arquivos?: PessoasArquivos,
    pivot: any,

    observacao?: string,
    foto?: string,
    key?: string,
}

export type Pessoas = Array<Pessoa>;