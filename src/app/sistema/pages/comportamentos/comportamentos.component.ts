import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioComportamentosComponent } from "./formulario/formulario-comportamentos.component";
import { Comportamento, Comportamentos } from "./comportamentos";
import { ComportamentosService } from "./comportamentos.service";

@Component({
    selector: 'comportamentos',
    templateUrl: './comportamentos.component.html',
    styleUrls: ['./comportamentos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioComportamentosComponent]
})

export class ComportamentosComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Comportamentos>;

    protected excluir!: Comportamento;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioComportamentosComponent) formulario!: FormularioComportamentosComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;

    constructor(private sharedService: SharedService,
        private comportamentosService: ComportamentosService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.comportamentosService.index().pipe(
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
        this.data$ = this.comportamentosService.index().pipe(
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

    edit(data: Comportamento){
        this.formulario.editar(data);
    }

    delete(data: Comportamento){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.comportamentosService.destroy(this.excluir.id || 0).subscribe({
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