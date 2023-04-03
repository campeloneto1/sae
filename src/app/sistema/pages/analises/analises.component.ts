import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioAnalisesComponent } from "./formulario/formulario-analises.component";
import { Analise, Analises } from "./analises";
import { AnalisesService } from "./analises.service";
import { SessionService } from "../../shared/session.service";
import { Usuario } from "../usuarios/usuarios";
import { AnalisesPessoasService } from "./formulario-analises-pessoas/analises-pessoas.service";
import { AnalisesVeiculosService } from "./formulario-analises-veiculos/analises-veiculos.service";
import { FormularioAnalisesPessoasComponent } from "./formulario-analises-pessoas/formulario-analises-pessoas.component";
import { FormularioAnalisesVeiculosComponent } from "./formulario-analises-veiculos/formulario-analises-veiculos.component";
import { FormularioVeiculosComponent } from "../veiculos/formulario/formulario-veiculos.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'analises',
    templateUrl: './analises.component.html',
    styleUrls: ['./analises.component.css'],
    standalone: true,
    imports: [
        CommonModule, 
        SharedModule, 
        TituloComponent, 
        FormularioAnalisesComponent,
        FormularioAnalisesPessoasComponent,
        FormularioAnalisesVeiculosComponent,
        FormularioVeiculosComponent,
        RouterModule
    ]
})

export class AnalisesComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Analises>;

    protected user!: Usuario;

    protected excluir!: Analise;

    protected informacoes!: Analise;

    protected cadvei: boolean = false;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioAnalisesComponent) formulario!: FormularioAnalisesComponent;

    @ViewChild('closeModalCadastro') modelCadastro:any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private analisesService: AnalisesService,
        private analisesPessoasService: AnalisesPessoasService,
        private analisesVeiculosService: AnalisesVeiculosService,
        private sessionService: SessionService){

    }
   

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [2, 'asc'] };        

        this.data$ = this.analisesService.index().pipe(
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
        this.data$ = this.analisesService.index().pipe(
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

    refresh2(){
        this.subscription2 = this.analisesService.show(this.informacoes.id || 0).subscribe({
            next: (data) => {
                this.informacoes = data;
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });        
    }

    getAnalise(data:number){
        this.subscription3 = this.analisesService.show(data).subscribe({
            next: (data) => {
                this.informacoes = data;                
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    submitCadastro(){
        this.modelCadastro.nativeElement.click();
        this.refresh();
    }

    cancelCadastro(){
        this.modelCadastro.nativeElement.click();
    }

    edit(data: Analise){
        this.formulario.editar(data);
    }

    delete(data: Analise){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.analisesService.destroy(this.excluir.id || 0).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    showInformacoes(data: Analise){
        this.informacoes = {} as Analise;
        this.getAnalise(data.id || 0);
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
            this.analisesVeiculosService.destroy(data).subscribe({
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
            this.analisesPessoasService.destroy(data).subscribe({
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