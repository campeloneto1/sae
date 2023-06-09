import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SessionService } from "../../shared/session.service";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { Usuario } from "../usuarios/usuarios";
import { FormularioVeiculosComponent } from "../veiculos/formulario/formulario-veiculos.component";
import { FormularioOrganizacoesPessoasComponent } from "./formulario-organizacoes-pessoas/formulario-organizacoes-pessoas.component";
import { OrganizacoesPessoasService } from "./formulario-organizacoes-pessoas/organizacoes-pessoas.service";
import { FormularioOrganizacoesVeiculosComponent } from "./formulario-organizacoes-veiculos/formulario-organizacoes-veiculos.component";
import { OrganizacoesVeiculosService } from "./formulario-organizacoes-veiculos/organizacoes-veiculos.service";
import { FormularioOrganizacoesComponent } from "./formulario/formulario-organizacoes.component";
import { Organizacao, Organizacoes } from "./organizacoes";
import { OrganizacoesService } from "./organizacoes.service";

@Component({
    selector: 'organizacoes',
    templateUrl: './organizacoes.component.html',
    styleUrls: ['./organizacoes.component.css'],
    standalone: true,
    imports: [
        CommonModule, 
        SharedModule, 
        TituloComponent,
        FormularioOrganizacoesComponent,
        FormularioOrganizacoesPessoasComponent,
        FormularioOrganizacoesVeiculosComponent,
        FormularioVeiculosComponent,
        RouterModule
    ]
})

export class OrganizacoesComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Organizacoes>;

    protected user!: Usuario;

    protected excluir!: Organizacao;

    protected informacoes!: Organizacao;

    protected dtOptions: DataTables.Settings = {};  
    
    protected cadvei: boolean = false;

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioOrganizacoesComponent) formulario!: FormularioOrganizacoesComponent;

    @ViewChild('closeModalCadastro') modelCadastro:any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private sessionService: SessionService,
        private organizacoesService: OrganizacoesService,
        private organizacoesPessoasService: OrganizacoesPessoasService,
        private organizacoesVeiculosService: OrganizacoesVeiculosService,
        ){

    }
   

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [2, 'asc'] };        

        this.data$ = this.organizacoesService.index().pipe(
            tap(() => {
              this.dtTrigger.next(this.dtOptions);
            })
        );
        
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
    }

    refresh(){
        this.data$ = this.organizacoesService.index().pipe(
            tap(() => {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next(this.dtOptions);
              });
            })
          );
    }

    getOrganizacao(data:number){
        this.subscription3 = this.organizacoesService.show(data).subscribe({
            next: (data) => {
                this.informacoes = data;                
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    refresh2(){
        this.subscription2 = this.organizacoesService.show(this.informacoes.id || 0).subscribe({
            next: (data) => {
                this.informacoes = data;
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });        
    }

    submitCadastro(){
        this.refresh();
        this.modelCadastro.nativeElement.click();
    }

    cancelCadastro(){
        this.modelCadastro.nativeElement.click();
    }

    edit(data: Organizacao){
        this.formulario.editar(data);
    }

    delete(data: Organizacao){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.organizacoesService.destroy(this.excluir.id || 0).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    showInformacoes(data: Organizacao){
        this.informacoes = {} as Organizacao;
        this.getOrganizacao(data.id || 0);
    }

    cadVeiculo(){
        this.cadvei = false;
        this.refresh2();
    }

    cancelVeiculo(){
        this.cadvei = false;
    }
    
    deleteVeiculo(data: number){
        if (confirm("Tem certeza que deseja excluir o veículo?")){
            this.organizacoesVeiculosService.destroy(data).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 3);
                    this.refresh2();
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }

    deletePessoa(data: number){
        if (confirm("Tem certeza que deseja excluir a pessoa?")){
            this.organizacoesPessoasService.destroy(data).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 3);
                    this.refresh2();
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }
}