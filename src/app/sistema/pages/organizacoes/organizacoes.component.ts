import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioOrganizacoesComponent } from "./formulario/formulario-organizacoes.component";
import { Organizacao, Organizacoes } from "./organizacoes";
import { OrganizacoesService } from "./organizacoes.service";

@Component({
    selector: 'organizacoes',
    templateUrl: './organizacoes.component.html',
    styleUrls: ['./organizacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioOrganizacoesComponent]
})

export class OrganizacoesComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Organizacoes>;

    protected excluir!: Organizacao;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioOrganizacoesComponent) formulario!: FormularioOrganizacoesComponent;

    @ViewChild('closeModalCadastro') modelCadastro:any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private organizacoesService: OrganizacoesService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

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

    cadVeiculo(){
        this.refresh();
        this.modelCadastro.nativeElement.click();
    }

    cancelVeiculo(){
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
}