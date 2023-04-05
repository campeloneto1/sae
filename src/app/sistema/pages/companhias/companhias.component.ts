import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedService } from "../../shared/shared.service";
import { Companhia, Companhias } from "./companhias";
import { CompanhiasService } from "./companhias.service";
import { FormularioCompanhiasComponent } from "./formulario/formulario-companhias.component";

@Component({
    selector: 'companhias',
    templateUrl: './companhias.component.html',
    styleUrls: ['./companhias.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioCompanhiasComponent]
})

export class CompanhiasComponent{
    protected data$!: Observable<Companhias>;

    protected excluir!: Companhia;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioCompanhiasComponent) formulario!: FormularioCompanhiasComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private companhiasService: CompanhiasService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [[1, 'asc'],[2, 'asc']] };        

        this.data$ = this.companhiasService.index().pipe(
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
        this.data$ = this.companhiasService.index().pipe(
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

    edit(data: Companhia){
        this.formulario.editar(data);
    }

    delete(data: Companhia){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.companhiasService.destroy(this.excluir.id || 0).subscribe({
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