import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioSituacoesFuncionaisComponent } from "./formulario/formulario-situacoes-funcionais.component";
import { SituacaoFuncional, SituacoesFuncionais } from "./situacoes-funcionais";
import { SituacoesFuncionaisService } from "./situacoes-funcionais.service";

@Component({
    selector: 'situacoes-funcionais',
    templateUrl: './situacoes-funcionais.component.html',
    styleUrls: ['./situacoes-funcionais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioSituacoesFuncionaisComponent]
})

export class SituacoesFuncionaisComponent implements OnInit, OnDestroy{
    protected data$!: Observable<SituacoesFuncionais>;

    protected excluir!: SituacaoFuncional;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioSituacoesFuncionaisComponent) formulario!: FormularioSituacoesFuncionaisComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private situacoesFuncionaisService: SituacoesFuncionaisService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.situacoesFuncionaisService.index().pipe(
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
        this.data$ = this.situacoesFuncionaisService.index().pipe(
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

    edit(data: SituacaoFuncional){
        this.formulario.editar(data);
    }

    delete(data: SituacaoFuncional){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.situacoesFuncionaisService.destroy(this.excluir.id || 0).subscribe({
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