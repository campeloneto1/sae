import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environments";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SessionService } from "../../shared/session.service";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";
import { FormularioPessoasRedesSociaisComponent } from "../pessoas/formulario-pessoas-redes-sociais/formulario-pessoas-redes-sociais.component";
import { PessoasRedesSociaisService } from "../pessoas/formulario-pessoas-redes-sociais/pessoas-redes-sociais.service";
import { FormularioPessoasVeiculosComponent } from "../pessoas/formulario-pessoas-veiculos/formulario-pessoas-veiculos.component";
import { PessoasVeiculosService } from "../pessoas/formulario-pessoas-veiculos/pessoas-veiculos.service";
import { FormularioPessoasVinculosComponent } from "../pessoas/formulario-pessoas-vinculos/formulario-pessoas-vinculos.component";
import { PessoasVinculosService } from "../pessoas/formulario-pessoas-vinculos/pessoas-vinculos.service";
import { FormularioPessoasComponent } from "../pessoas/formulario/formulario-pessoas.component";
import { Pessoa } from "../pessoas/pessoas";
import { PessoasService } from "../pessoas/pessoas.service";
import { Usuario } from "../usuarios/usuarios";
import { FormularioVeiculosComponent } from "../veiculos/formulario/formulario-veiculos.component";
import { FormularioInvestigacoesSociaisBoletinsComponent } from "./formulario-investigacoes-sociais-boletins/formulario-investigacoes-sociais-boletins.component";
import { InvestigacoesSociaisBoletinsService } from "./formulario-investigacoes-sociais-boletins/investigacoes-sociais-boletins.service";
import { FormularioInvestigacoesSociaisCgdsComponent } from "./formulario-investigacoes-sociais-cgds/formulario-investigacoes-sociais-cgds.component";
import { InvestigacoesSociaisCgdsService } from "./formulario-investigacoes-sociais-cgds/investigacoes-sociais-cgds.service";
import { FormularioInvestigacoesSociaisLotacoesComponent } from "./formulario-investigacoes-sociais-lotacoes/formulario-investigacoes-sociais-lotacoes.component";
import { InvestigacoesSociaisLotacoesService } from "./formulario-investigacoes-sociais-lotacoes/investigacoes-sociais-lotacoes.service";
import { FormularioInvestigacoesSociaisComponent } from "./formulario/formulario-investigacoes-sociais.component";
import { InvestigacaoSocial, InvestigacoesSociais } from "./investigacoes-sociais";
import { InvestigacoesSociaisService } from "./investigacoes-sociais.service";

@Component({
    selector: 'investigacoes-sociais',
    templateUrl: './investigacoes-sociais.component.html',
    styleUrls: ['./investigacoes-sociais.component.css'],
    standalone: true,
    imports: [CommonModule, 
        RouterModule,
        SharedModule, 
        TituloComponent, 
        FormularioInvestigacoesSociaisComponent,
        FormularioPessoasComponent,
        FormularioPessoasVeiculosComponent,
        FormularioPessoasRedesSociaisComponent,
        FormularioPessoasVinculosComponent,
        FormularioVeiculosComponent,
        FormularioInvestigacoesSociaisBoletinsComponent,
        FormularioInvestigacoesSociaisLotacoesComponent,
         FormularioInvestigacoesSociaisCgdsComponent
    ]
})

export class InvestigacoesSociaisComponent implements OnInit, OnDestroy{
    protected IMG = environment.image;
    protected data$!: Observable<InvestigacoesSociais>;

    protected excluir!: InvestigacaoSocial;
    protected informacoes!: Pessoa;
    protected informacoes2!: InvestigacaoSocial;
    protected foto!: Pessoa;
    protected cadveiculo:boolean = false;
    protected dtOptions: DataTables.Settings = {};    
    protected user!: Usuario;

    @ViewChild(DataTableDirective, { static: false })  dtElement!: DataTableDirective;

    @ViewChild(FormularioInvestigacoesSociaisComponent) formulario!: FormularioInvestigacoesSociaisComponent;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    protected dtTrigger: Subject<any> = new Subject<any>();    

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private sharedService: SharedService,
        private http: HttpClient,
        private sessionService: SessionService,
        private pessoasService: PessoasService,
        private investigacoesSociaisService: InvestigacoesSociaisService,
        private investigacoesSociaisBoletinsService: InvestigacoesSociaisBoletinsService,
        private investigacoesSociaisLotacoesService: InvestigacoesSociaisLotacoesService,
        private investigacoesSociaisCgdsService: InvestigacoesSociaisCgdsService,
        private pessoasRedesSociaisService: PessoasRedesSociaisService,
        private pessoasVeiculosService: PessoasVeiculosService,
        private pessoasVinculosService: PessoasVinculosService
        
    ){

    }
   

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
        this.dtOptions = this.sharedService.getDtOptions();
        this.dtOptions = { ...this.dtOptions, order: [1, 'asc'] };        

        this.data$ = this.investigacoesSociaisService.index().pipe(
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
        this.data$ = this.investigacoesSociaisService.index().pipe(
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

    refresh3(){
        this.subscription3 = this.investigacoesSociaisService.show(this.informacoes2.id || 0).subscribe({
            next: (data) => {
                this.informacoes2 = data;
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });   
    }

    edit(data: InvestigacaoSocial){
        this.formulario.editar(data);
    }

    delete(data: InvestigacaoSocial){
        this.excluir = data;
    }

    confirm(){
        //console.log(this.excluir);
        this.subscription = this.investigacoesSociaisService.destroy(this.excluir.id || 0).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
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

    getInvestigacaoSocial(data: number){
        this.subscription3 = this.investigacoesSociaisService.show(data).subscribe({
            next: (data) => {
                this.informacoes2 = data;                
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

    showInformacoes(data: Pessoa){
        this.informacoes = {} as Pessoa;
        this.getPessoa(data.id || 0);
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

    deleteVinculo(data: number){
        if (confirm("Tem certeza que deseja excluir o vínculo?")){
            this.pessoasVinculosService.destroy(data).subscribe({
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


    showInformacoes2(data: InvestigacaoSocial){
        //this.informacoes2 = data;
        this.informacoes2 = {} as InvestigacaoSocial;
        this.getInvestigacaoSocial(data.id || 0);
    }

    deleteBoletim(data: number){
        if (confirm("Tem certeza que deseja excluir o boletim?")){
            this.investigacoesSociaisBoletinsService.destroy(data).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 3);
                    this.refresh3();
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }

    deleteLotacao(data: number){
        if (confirm("Tem certeza que deseja excluir a lotação?")){
            this.investigacoesSociaisLotacoesService.destroy(data).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 3);
                    this.refresh3();
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }

    deleteCgd(data: number){
        if (confirm("Tem certeza que deseja excluir a cgd?")){
            this.investigacoesSociaisCgdsService.destroy(data).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 3);
                    this.refresh3();
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }
}