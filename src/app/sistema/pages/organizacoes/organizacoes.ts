import { Cidade } from "../cidades/cidades";
import { Estado } from "../estados/estados";
import { OrganizacaoTipo } from "../organizacoes-tipos/organizacoes-tipos";
import { Pais } from "../paises/paises";
import { Pessoas } from "../pessoas/pessoas";
import { Veiculos } from "../veiculos/veiculos";
import { OrganizacoesArquivos } from "./formulario-organizacoes-arquivos/organizacoes-arquivos";

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
    pivot: any,
    veiculos: Veiculos,
    pessoas: Pessoas,
    arquivos: OrganizacoesArquivos
}

export type Organizacoes = Array<Organizacao>;