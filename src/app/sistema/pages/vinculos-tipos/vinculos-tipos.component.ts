import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormulariovinculosTiposComponent } from "./formulario/formulario-vinculos-tipos.component";
import { VinculoTipo, VinculosTipos } from "./vinculos-tipos";
import { VinculosTiposService } from "./vinculos-tipos.service";

@Component({
    selector: 'vinculos-tipos',
    templateUrl: './vinculos-tipos.component.html',
    styleUrls: ['./vinculos-tipos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormulariovinculosTiposComponent]
})

export class VinculosTiposComponent implements OnInit, OnDestroy{
    protected data$!: Observable<VinculosTipos>;

    protected excluir!: VinculoTipo;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormulariovinculosTiposComponent) formulario!: FormulariovinculosTiposComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private vinculosTiposService: VinculosTiposService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.vinculosTiposService.index().pipe(
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
        this.data$ = this.vinculosTiposService.index().pipe(
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

    edit(data: VinculoTipo){
        this.formulario.editar(data);
    }

    delete(data: VinculoTipo){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.vinculosTiposService.destroy(this.excluir.id || 0).subscribe({
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