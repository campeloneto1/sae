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
                path: 'Analises',
                loadComponent: () => import('./pages/analises/analises.component').then((c) => c.AnalisesComponent)
            },
            {
                path: 'Analises/Tipos',
                loadComponent: () => import('./pages/analises-tipos/analises-tipos.component').then((c) => c.AnalisesTiposComponent)
            },
            {
                path: 'Analises/Categorias',
                loadComponent: () => import('./pages/analises-categorias/analises-categorias.component').then((c) => c.AnalisesCategoriasComponent)
            },
            {
                path: 'Arquivos/Tipos',
                loadComponent: () => import('./pages/arquivos-tipos/arquivos-tipos.component').then((c) => c.ArquivosTiposComponent)
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
                path: 'Organizacoes',
                loadComponent: () => import('./pages/organizacoes/organizacoes.component').then((c) => c.OrganizacoesComponent)
            },
            {
                path: 'Organizacoes/:id',
                loadComponent: () => import('./pages/organizacoes/organizacao/organizacao.component').then((c) => c.OrganizacaoComponent)
            },
            {
                path: 'Organizacoes/Tipos',
                loadComponent: () => import('./pages/organizacoes-tipos/organizacoes-tipos.component').then((c) => c.OrganizacoesTiposComponent)
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
                path: 'Pessoas/:id',
                loadComponent: () => import('./pages/pessoas/pessoa/pessoa.component').then((c) => c.PessoaComponent)
            },
            {
                path: 'Pessoas/:id/Imprimir',
                loadComponent: () => import('./pages/pessoas/imprimir-pessoa/imprimir-pessoa.component').then((c) => c.ImprimirPessoaComponent)
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
                path: 'Veiculos/:id',
                loadComponent: () => import('./pages/veiculos/veiculo/veiculo.component').then((c) => c.VeiculoComponent)
            },
            {
                path: 'Veiculos/:id/Imprimir',
                loadComponent: () => import('./pages/veiculos/imprimir-veiculo/imprimir-veiculo.component').then((c) => c.ImprimirVeiculoComponent)
            },
            {
                path: 'Veiculos',
                loadComponent: () => import('./pages/veiculos/veiculos.component').then((c) => c.VeiculosComponent)
            },
            {
                path: 'Veiculos/Tipos',
                loadComponent: () => import('./pages/veiculos-tipos/veiculos-tipos.component').then((c) => c.VeiculosTiposComponent)
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