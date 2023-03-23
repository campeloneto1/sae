import { Perfil } from "../perfis/perfis";

export interface Usuario{
    id?: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    //telefone2: string,
    perfil_id: number,
    perfil: Perfil
}

export type Usuarios = Array<Usuario>;