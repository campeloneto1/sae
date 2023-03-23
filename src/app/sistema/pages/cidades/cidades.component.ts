import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { Cidade, Cidades } from "./cidades";
import { CidadesService } from "./cidades.service";
import { FormularioCidadesComponent } from "./formulario/formulario-cidades.component";

@Component({
    selector: 'cidades',
    templateUrl: './cidades.component.html',
    styleUrls: ['./cidades.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioCidadesComponent]
})

export class CidadesComponent{
    protected data$!: Observable<Cidades>;

    protected excluir!: Cidade;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioCidadesComponent) formulario!: FormularioCidadesComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;

    constructor(private sharedService: SharedService,
        private cidadesService: CidadesService){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [[1, 'asc'],[2, 'asc'],[3, 'asc']] };        

        this.data$ = this.cidadesService.index().pipe(
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
        this.data$ = this.cidadesService.index().pipe(
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

    edit(data: Cidade){
        
        this.formulario.editar(data);
    }

    delete(data: Cidade){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.cidadesService.destroy(this.excluir.id || 0).subscribe({
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