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
import { PessoasRedesSociaisService } from "./formulario-pessoas-redes-sociais/pessoas-redes-sociais.service";
import { PessoasService } from "./pessoas.service";
import { RouterModule } from "@angular/router";
import { FormularioPessoasVeiculosComponent } from "./formulario-pessoas-veiculos/formulario-pessoas-veiculos.component";
import { PessoasVeiculosService } from "./formulario-pessoas-veiculos/pessoas-veiculos.service";
import { FormularioVeiculosComponent } from "../veiculos/formulario/formulario-veiculos.component";
import { AnalisesPessoasService } from "../analises/formulario-analises-pessoas/analises-pessoas.service";
import { FormularioPessoasAnalisesComponent } from "./formulario-pessoas-analises/formulario-pessoas-analises.component";
import { OrganizacoesPessoasService } from "../organizacoes/formulario-organizacoes-pessoas/organizacoes-pessoas.service";
import { FormularioPessoasOrganizacoesComponent } from "./formulario-pessoas-organizacoes/formulario-pessoas-organizacoes.component";
import { environment } from "src/environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../usuarios/usuarios";
import { SessionService } from "../../shared/session.service";
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
        FormularioPessoasVeiculosComponent, 
        FormularioVeiculosComponent,
        FormularioPessoasAnalisesComponent,
        FormularioPessoasOrganizacoesComponent
    ]
})

export class PessoasComponent implements OnInit, OnDestroy{
    protected IMG = environment.image;
    protected data$!: Observable<Pessoas>;

    protected user!: Usuario;

    protected excluir!: Pessoa;

    protected informacoes!: Pessoa;

    protected foto!: Pessoa;

    protected dtOptions: DataTables.Settings = {};    

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioPessoasComponent) formulario!: FormularioPessoasComponent;

    @ViewChild('closeModalCadastro') modelCadastro:any;

    protected cadveiculo: boolean = false;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private sessionService: SessionService,
        private pessoasService: PessoasService,
        private pessoasRedesSociaisService: PessoasRedesSociaisService,
        private pessoasVeiculosService: PessoasVeiculosService,
        private analisesPessoasService: AnalisesPessoasService,
        private organizacoesPessoasService: OrganizacoesPessoasService,
        private http: HttpClient){

    }

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
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

    submitCadastro(){
        this.modelCadastro.nativeElement.click();
        this.refresh();
    }

    cancelCadastro(){
        this.modelCadastro.nativeElement.click();
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

    showFoto(data: Pessoa){
        this.foto = data;
    }

    fileEvent(e: any){
        var filedata = e.target.files[0];
        //console.log(this.filedata);
    
        var myFormData = new FormData();
          const headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
          myFormData.append('file', filedata);
          myFormData.append('id', this.foto?.id+'');
          /* Image Post Request */
          this.http.post(`${environment.url}/upload-foto`, myFormData, {
          headers: headers
          }).subscribe({
            next: (data) => {       
                this.pessoasService.show(this.foto.id || 0).subscribe(data => {
                  this.foto = data;
                })
                this.refresh();
                this.sharedService.toast('Sucesso!', data as string, 3);          
             },
             error: (error) => {
              console.log(error)
               this.sharedService.toast('Error!', error.error.erro as string, 4);
             }
          });  
      }

    showRedesSociais(data: Pessoa){
        this.informacoes = data;
    }

    deleteRedeSocial(data: number){
        if (confirm("Tem certeza que deseja excluir a rede social?")){
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
        
    }

    showVeiculos(data: Pessoa){
        this.informacoes = {} as Pessoa;
        this.getPessoa(data.id || 0);
    }

    deleteVeiculo(data: number){
        if (confirm("Tem certeza que deseja excluir o veículo?")){
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

    cadVeiculo(){
        this.cadveiculo = false;
        
    }

    cancelVeiculo(){
        this.cadveiculo = false;
    }

    showAnalises(data: Pessoa){
        this.informacoes = {} as Pessoa;
        this.getPessoa(data.id || 0);
    }

    deleteAnalise(data: number){
        if (confirm("Tem certeza que deseja excluir a análise?")){
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

    showOrganizacoes(data: Pessoa){
        this.informacoes = {} as Pessoa;
        this.getPessoa(data.id || 0);
    }

    deleteOrganizacao(data: number){
        if (confirm("Tem certeza que deseja excluir a organização?")){
            this.organizacoesPessoasService.destroy(data).subscribe({
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