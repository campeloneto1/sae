import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioPessoasRedesSociaisComponent } from "./formulario-pessoas-redes-sociais/formulario-pessoas-redes-sociais.component";
import { FormularioPessoasComponent } from "./formulario/formulario-pessoas.component";
import { Pessoa, Pessoas } from "./pessoas";
import { PessoasRedesSociaisService } from "./pessoas-redes-sociais.service";
import { PessoasService } from "./pessoas.service";
import { RouterModule } from "@angular/router";
import { FormularioPessoasVeiculosComponent } from "./formulario-pessoas-veiculos/formulario-pessoas-veiculos.component";
import { PessoasVeiculosService } from "./pessoas-veiculos.service";
@Component({
    selector: 'pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.css'],
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        SharedModule, 
        TituloComponent, 
        FormularioPessoasComponent, 
        FormularioPessoasRedesSociaisComponent, 
        FormularioPessoasVeiculosComponent]
})

export class PessoasComponent implements OnInit, OnDestroy{
    protected data$!: Observable<Pessoas>;

    protected excluir!: Pessoa;

    protected informacoes!: Pessoa;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioPessoasComponent) formulario!: FormularioPessoasComponent;

    @ViewChild('closeModalPessoa') modalPessoa:any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private pessoasService: PessoasService,
        private pessoasRedesSociaisService: PessoasRedesSociaisService,
        private pessoasVeiculosService: PessoasVeiculosService){

    }

    ngOnInit(): void {
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.pessoasService.index().pipe(
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
        this.data$ = this.pessoasService.index().pipe(
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
        this.subscription2 = this.pessoasService.show(this.informacoes.id || 0).subscribe({
            next: (data) => {
                this.informacoes = data;
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });        
    }

    cadastroPessoa(){
        this.refresh();
        this.modalPessoa.nativeElement.click();
    }

    cancelarCadastro(){
        this.modalPessoa.nativeElement.click();
    }

    getPessoa(data: number){
        this.subscription3 = this.pessoasService.show(data).subscribe({
            next: (data) => {
                this.informacoes = data;                
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
        
    }

    edit(data: Pessoa){
        this.formulario.editar(data);
    }

    delete(data: Pessoa){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.pessoasService.destroy(this.excluir.id || 0).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    showRedesSociais(data: Pessoa){
        this.informacoes = data;
    }

    deleteRedeSocial(data: number){
        this.pessoasRedesSociaisService.destroy(data).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh2();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    showVeiculos(data: Pessoa){
        this.informacoes = {} as Pessoa;
        this.getPessoa(data.id || 0);
    }

    deleteVeiculo(data: number){
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