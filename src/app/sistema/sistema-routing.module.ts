import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlowedGuard } from "../guards/alowed.guard";
import { SistemaComponent } from "./sistema.component";

const routes: Routes = [
    {
        path: '',
        component: SistemaComponent,
        children: [
            {
                path: 'Inicio',
                loadComponent: () => import('./pages/inicio/inicio.component').then((c) => c.InicioComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Analises',
                loadComponent: () => import('./pages/analises/analises.component').then((c) => c.AnalisesComponent),
                canActivate: [AlowedGuard]
            },
            
            {
                path: 'Analises/Tipos',
                loadComponent: () => import('./pages/analises-tipos/analises-tipos.component').then((c) => c.AnalisesTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Analises/Categorias',
                loadComponent: () => import('./pages/analises-categorias/analises-categorias.component').then((c) => c.AnalisesCategoriasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Analises/:id',
                loadComponent: () => import('./pages/analises/analise/analise.component').then((c) => c.AnaliseComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Analises/:id/Imprimir',
                loadComponent: () => import('./pages/analises/imprimir-analise/imprimir-analise.component').then((c) => c.ImprimirAnaliseComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Arquivos/Tipos',
                loadComponent: () => import('./pages/arquivos-tipos/arquivos-tipos.component').then((c) => c.ArquivosTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Batalhoes',
                loadComponent: () => import('./pages/batalhoes/batalhoes.component').then((c) => c.BatalhoesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Cidades',
                loadComponent: () => import('./pages/cidades/cidades.component').then((c) => c.CidadesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'CgdsEnvolvimentos/Tipos',
                loadComponent: () => import('./pages/cgds-envolvimentos-tipos/cgds-envolvimentos-tipos.component').then((c) => c.CgdsEnvolvimentoTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'CgdsProcessos/Tipos',
                loadComponent: () => import('./pages/cgds-processos-tipos/cgds-processos-tipos.component').then((c) => c.CgdsProcessosTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'CgdsSituacoes/Tipos',
                loadComponent: () => import('./pages/cgds-situacoes-tipos/cgds-situacoes-tipos.component').then((c) => c.CgdsProcessosTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Cnh/Categorias',
                loadComponent: () => import('./pages/cnh-categorias/cnh-categorias.component').then((c) => c.CnhCategoriasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Companhias',
                loadComponent: () => import('./pages/companhias/companhias.component').then((c) => c.CompanhiasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Comportamentos',
                loadComponent: () => import('./pages/comportamentos/comportamentos.component').then((c) => c.ComportamentosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Cores',
                loadComponent: () => import('./pages/cores/cores.component').then((c) => c.CoresComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Escolaridades',
                loadComponent: () => import('./pages/escolaridades/escolaridades.component').then((c) => c.EscolaridadesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Estados',
                loadComponent: () => import('./pages/estados/estados.component').then((c) => c.EstadosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Graduacoes',
                loadComponent: () => import('./pages/graduacoes/graduacoes.component').then((c) => c.GraduacoesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Influencias',
                loadComponent: () => import('./pages/influencias/influencias.component').then((c) => c.InfluenciasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'InvestigacoesSociais',
                loadComponent: () => import('./pages/investigacoes-sociais/investigacoes-sociais.component').then((c) => c.InvestigacoesSociaisComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'InvestigacoesSociais/Status',
                loadComponent: () => import('./pages/investigacoes-sociais-status/investigacoes-sociais-status.component').then((c) => c.InvestigacoesSociaisStatusComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'InvestigacoesSociais/:id',
                loadComponent: () => import('./pages/investigacoes-sociais/investigacao-social/investigacao-social.component').then((c) => c.InvestigacaoSocialComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'InvestigacoesSociais/:id/Imprimir',
                loadComponent: () => import('./pages/investigacoes-sociais/imprimir-investigacao-social/imprimir-investigacao-social.component').then((c) => c.ImprimirInvestigacaoSocialComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Logs',
                loadComponent: () => import('./pages/logs/logs.component').then((c) => c.LogsComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Lotacoes/Tipos',
                loadComponent: () => import('./pages/lotacoes-tipos/lotacoes-tipos.component').then((c) => c.LotacoesTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Marcas',
                loadComponent: () => import('./pages/marcas/marcas.component').then((c) => c.MarcasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Modelos',
                loadComponent: () => import('./pages/modelos/modelos.component').then((c) => c.ModelosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Organizacoes',
                loadComponent: () => import('./pages/organizacoes/organizacoes.component').then((c) => c.OrganizacoesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Organizacoes/Tipos',
                loadComponent: () => import('./pages/organizacoes-tipos/organizacoes-tipos.component').then((c) => c.OrganizacoesTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Organizacoes/:id',
                loadComponent: () => import('./pages/organizacoes/organizacao/organizacao.component').then((c) => c.OrganizacaoComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Organizacoes/:id/Imprimir',
                loadComponent: () => import('./pages/organizacoes/imprimir-organizacao/imprimir-organizacao.component').then((c) => c.ImprimirOrganizacaoComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Paises',
                loadComponent: () => import('./pages/paises/paises.component').then((c) => c.PaisesComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Pesquisar',
                loadComponent: () => import('./pages/pesquisar/pesquisar.component').then((c) => c.PesquisarComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Perfis',
                loadComponent: () => import('./pages/perfis/perfis.component').then((c) => c.PerfisComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Pessoas/:id',
                loadComponent: () => import('./pages/pessoas/pessoa/pessoa.component').then((c) => c.PessoaComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Pessoas/:id/Imprimir',
                loadComponent: () => import('./pages/pessoas/imprimir-pessoa/imprimir-pessoa.component').then((c) => c.ImprimirPessoaComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Pessoas',
                loadComponent: () => import('./pages/pessoas/pessoas.component').then((c) => c.PessoasComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'RedesSociais',
                loadComponent: () => import('./pages/redes-sociais/redes-sociais.component').then((c) => c.RedesSociaisComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Sexos',
                loadComponent: () => import('./pages/sexos/sexos.component').then((c) => c.SexosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Situacoes/Funcionais',
                loadComponent: () => import('./pages/situacoes-funcionais/situacoes-funcionais.component').then((c) => c.SituacoesFuncionaisComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Situacoes/Tipos',
                loadComponent: () => import('./pages/situacoes-tipos/situacoes-tipos.component').then((c) => c.SituacoesTiposComponent),
                canActivate: [AlowedGuard]
            },

            {
                path: 'Usuarios',
                loadComponent: () => import('./pages/usuarios/usuarios.component').then((c) => c.UsuariosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Veiculos',
                loadComponent: () => import('./pages/veiculos/veiculos.component').then((c) => c.VeiculosComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Veiculos/Tipos',
                loadComponent: () => import('./pages/veiculos-tipos/veiculos-tipos.component').then((c) => c.VeiculosTiposComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Veiculos/:id',
                loadComponent: () => import('./pages/veiculos/veiculo/veiculo.component').then((c) => c.VeiculoComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Veiculos/:id/Imprimir',
                loadComponent: () => import('./pages/veiculos/imprimir-veiculo/imprimir-veiculo.component').then((c) => c.ImprimirVeiculoComponent),
                canActivate: [AlowedGuard]
            },
            {
                path: 'Vinculos/Tipos',
                loadComponent: () => import('./pages/vinculos-tipos/vinculos-tipos.component').then((c) => c.VinculosTiposComponent),
                canActivate: [AlowedGuard]
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