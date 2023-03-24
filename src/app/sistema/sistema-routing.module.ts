import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SistemaComponent } from "./sistema.component";

const routes: Routes = [
    {
        path: '',
        component: SistemaComponent,
        children: [
            {
                path: 'Inicio',
                loadComponent: () => import('./pages/inicio/inicio.component').then((c) => c.InicioComponent)
            },
            {
                path: 'Cidades',
                loadComponent: () => import('./pages/cidades/cidades.component').then((c) => c.CidadesComponent)
            },
            {
                path: 'Cores',
                loadComponent: () => import('./pages/cores/cores.component').then((c) => c.CoresComponent)
            },
            {
                path: 'Estados',
                loadComponent: () => import('./pages/estados/estados.component').then((c) => c.EstadosComponent)
            },
            {
                path: 'Influencias',
                loadComponent: () => import('./pages/influencias/influencias.component').then((c) => c.InfluenciasComponent)
            },
            {
                path: 'Marcas',
                loadComponent: () => import('./pages/marcas/marcas.component').then((c) => c.MarcasComponent)
            },
            {
                path: 'Modelos',
                loadComponent: () => import('./pages/modelos/modelos.component').then((c) => c.ModelosComponent)
            },
            {
                path: 'Paises',
                loadComponent: () => import('./pages/paises/paises.component').then((c) => c.PaisesComponent)
            },
            {
                path: 'Perfis',
                loadComponent: () => import('./pages/perfis/perfis.component').then((c) => c.PerfisComponent)
            },
            {
                path: 'Pessoa/:id',
                loadComponent: () => import('./pages/pessoas/pessoa/pessoa.component').then((c) => c.PessoaComponent)
            },
            {
                path: 'Pessoas',
                loadComponent: () => import('./pages/pessoas/pessoas.component').then((c) => c.PessoasComponent)
            },
            {
                path: 'RedesSociais',
                loadComponent: () => import('./pages/redes-sociais/redes-sociais.component').then((c) => c.RedesSociaisComponent)
            },
            {
                path: 'Sexos',
                loadComponent: () => import('./pages/sexos/sexos.component').then((c) => c.SexosComponent)
            },
            {
                path: 'Usuarios',
                loadComponent: () => import('./pages/usuarios/usuarios.component').then((c) => c.UsuariosComponent)
            },
            {
                path: '',
                redirectTo: 'Inicio',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'Inicio',
                pathMatch: 'full',
            },
        ]
        
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SistemaRoutingModule{

}