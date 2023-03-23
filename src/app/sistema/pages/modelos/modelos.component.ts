import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedService } from "../../shared/shared.service";
import { Modelo, Modelos } from "./modelos";
import { ModelosService } from "./modelos.service";
import { FormularioModelosComponent } from "./formulario/formulario-modelos.component";

@Component({
    selector: 'modelos',
    templateUrl: './modelos.component.html',
    styleUrls: ['./modelos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioModelosComponent]
})

export class ModelosComponent{
    protected data$!: Observable<Modelos>;

    protected excluir!: Modelo;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioModelosComponent) formulario!: FormularioModelosComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;

    constructor(private sharedService: SharedService,
        private modelosService: ModelosService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [[1, 'asc'],[2, 'asc']] };        

        this.data$ = this.modelosService.index().pipe(
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
        this.data$ = this.modelosService.index().pipe(
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

    edit(data: Modelo){
        this.formulario.editar(data);
    }

    delete(data: Modelo){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.modelosService.destroy(this.excluir.id || 0).subscribe({
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