import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioCgdsSituacoesTiposComponent } from "./formulario/formulario-cgds-situacoes-tipos.component";
import { CgdSituacaoTipo, CgdsSituacoesTipos } from "./cgds-situacoes-tipos";
import { CgdsSituacoesTiposService } from "./cgds-situacoes-tipos.service";

@Component({
    selector: 'cgds-situacoes-tipos',
    templateUrl: './cgds-situacoes-tipos.component.html',
    styleUrls: ['./cgds-situacoes-tipos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioCgdsSituacoesTiposComponent]
})

export class CgdsProcessosTiposComponent implements OnInit, OnDestroy{
    protected data$!: Observable<CgdsSituacoesTipos>;

    protected excluir!: CgdSituacaoTipo;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioCgdsSituacoesTiposComponent) formulario!: FormularioCgdsSituacoesTiposComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private cgdsSituacoesTiposService: CgdsSituacoesTiposService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.cgdsSituacoesTiposService.index().pipe(
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
        this.data$ = this.cgdsSituacoesTiposService.index().pipe(
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

    edit(data: CgdSituacaoTipo){
        this.formulario.editar(data);
    }

    delete(data: CgdSituacaoTipo){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.cgdsSituacoesTiposService.destroy(this.excluir.id || 0).subscribe({
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