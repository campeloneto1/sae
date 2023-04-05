export interface Perfil{
    id?: number,
    nome: string,
    
    administrador: boolean,
    gestor: boolean,
    restrito: boolean,
    relatorios: boolean,

    users: boolean,
    users_cad: boolean,
    users_edt: boolean,
    users_del: boolean,

    analises: boolean,
    analises_cad: boolean,
    analises_edt: boolean,
    analises_del: boolean,

    investigacoes_sociais: boolean,
    investigacoes_sociais_cad: boolean,
    investigacoes_sociais_edt: boolean,
    investigacoes_sociais_del: boolean,

    organizacoes: boolean,
    organizacoes_cad: boolean,
    organizacoes_edt: boolean,
    organizacoes_del: boolean,

    pessoas: boolean,
    pessoas_cad: boolean,
    pessoas_edt: boolean,
    pessoas_del: boolean,

    veiculos: boolean,
    veiculos_cad: boolean,
    veiculos_edt: boolean,
    veiculos_del: boolean,
}

export type Perfis = Array<Perfil>;