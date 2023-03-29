import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { AnalisesVeiculosService } from "../analises/formulario-analises-veiculos/analises-veiculos.service";
import { OrganizacoesVeiculosService } from "../organizacoes/formulario-organizacoes-veiculos/organizacoes-veiculos.service";
import { PessoasVeiculosService } from "../pessoas/formulario-pessoas-veiculos/pessoas-veiculos.service";
import { FormularioVeiculosAnalisesComponent } from "./formulario-veiculos-analises/formulario-veiculos-analises.component";
import { FormularioVeiculosOrganizacoesComponent } from "./formulario-veiculos-organizacoes/formulario-veiculos-organizacoes.component";
import { FormularioVeiculosPessoasComponent } from "./formulario-veiculos-pessoas/formulario-veiculos-pessoas.component";
import { FormularioVeiculosComponent } from "./formulario/formulario-veiculos.component";
import { Veiculo, Veiculos } from "./veiculos";
import { VeiculosService } from "./veiculos.service";

@Component({
    selector: 'veiculos',
    templateUrl: './veiculos.component.html',
    styleUrls: ['./veiculos.component.css'],
    standalone: true,
    imports: [
        CommonModule, 
        SharedModule, 
        TituloComponent, 
        RouterModule,
        FormularioVeiculosComponent,
        FormularioVeiculosAnalisesComponent,
        FormularioVeiculosOrganizacoesComponent,
        FormularioVeiculosPessoasComponent
    ]
})

export class VeiculosComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Veiculos>;

    protected excluir!: Veiculo;

    protected informacoes!: Veiculo;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioVeiculosComponent) formulario!: FormularioVeiculosComponent;

    @ViewChild('closeModalCadastro') modelCadastro:any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private veiculosService: VeiculosService,
        private analisesVeiculosService: AnalisesVeiculosService,
        private pessoasVeiculosService: PessoasVeiculosService,
        private organizacoesVeiculosService: OrganizacoesVeiculosService,
        ){

    }
   

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [3, 'asc'] };        

        this.data$ = this.veiculosService.index().pipe(
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
        this.data$ = this.veiculosService.index().pipe(
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
        this.subscription2 = this.veiculosService.show(this.informacoes.id || 0).subscribe({
            next: (data) => {
                this.informacoes = data;
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });        
    }

    getVeiculo(data:number){
        this.subscription3 = this.veiculosService.show(data).subscribe({
            next: (data) => {
                this.informacoes = data;                
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    cadVeiculo(){
        this.refresh();
        this.modelCadastro.nativeElement.click();
    }

    cancelVeiculo(){
        this.modelCadastro.nativeElement.click();
    }

    edit(data: Veiculo){
        this.formulario.editar(data);
    }

    delete(data: Veiculo){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.veiculosService.destroy(this.excluir.id || 0).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    showInformacoes(data: Veiculo){
        this.informacoes = {} as Veiculo;
        this.getVeiculo(data.id || 0);
    }   

    deleteAnalise(data: number){
        if (confirm("Tem certeza que deseja excluir a análise?")){
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

    deleteOrganizacao(data: number){
        if (confirm("Tem certeza que deseja excluir a organização?")){
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
            this.pessoasVeiculosService.destroy(data).subscribe({
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