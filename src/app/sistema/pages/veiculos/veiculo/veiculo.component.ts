import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { FormularioVeiculosPessoasComponent } from '../formulario-veiculos-pessoas/formulario-veiculos-pessoas.component';
import { FormularioVeiculosAnalisesComponent } from '../formulario-veiculos-analises/formulario-veiculos-analises.component';
import { FormularioVeiculosOrganizacoesComponent } from '../formulario-veiculos-organizacoes/formulario-veiculos-organizacoes.component';
import { AnalisesVeiculosService } from '../../analises/formulario-analises-veiculos/analises-veiculos.service';
import { OrganizacoesVeiculosService } from '../../organizacoes/formulario-organizacoes-veiculos/organizacoes-veiculos.service';
import { VeiculosService } from '../veiculos.service';
import { Veiculo } from '../veiculos';
import { PessoasVeiculosService } from '../../pessoas/formulario-pessoas-veiculos/pessoas-veiculos.service';
import { FormularioVeiculosArquivosComponent } from '../formulario-veiculos-arquivos/formulario-veiculos-arquivos.component';
import { VeiculoArquivo } from '../formulario-veiculos-arquivos/veiculos-arquivos';
import { VeiculosArquivosService } from '../formulario-veiculos-arquivos/veiculos-arquivos.service';


@Component({
  selector: 'veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
    FormularioVeiculosPessoasComponent,
    FormularioVeiculosAnalisesComponent,
    FormularioVeiculosOrganizacoesComponent,
    FormularioVeiculosArquivosComponent,
    RouterModule
  ],
})
export class VeiculoComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected veiculo$!: Observable<Veiculo>;

  protected arquivo!: VeiculoArquivo;

  protected subscription: any;

  @ViewChild('fecharmodalanalises') closebuttonAnalises: any;
  @ViewChild('fecharmodalpessoa') closebuttonPessoas: any;
  @ViewChild('fecharmodalorganizacoes') closebuttonOrganizacao: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private veiculosService: VeiculosService,
    private pessoasVeiculosService: PessoasVeiculosService,
    private analisesVeiculosService: AnalisesVeiculosService,
    private organizacoesVeiculosService: OrganizacoesVeiculosService,
    private veiculosArquivosService: VeiculosArquivosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.veiculo$ = this.veiculosService.show(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.veiculo$ = this.veiculosService.show(this.id);
  }

  
  sudmitAnalise(){
    this.closebuttonAnalises.nativeElement.click();
    this.refresh();
  }

  sudmitOrganizacao(){
    this.closebuttonOrganizacao.nativeElement.click();
    this.refresh();
  }

  sudmitPessoa(){
    this.closebuttonPessoas.nativeElement.click();
    this.refresh();
  }

  sudmitArquivo(){
    this.closebuttonArquivos.nativeElement.click();
    this.refresh();
  }

  showArquivo(data:VeiculoArquivo){
    this.arquivo = data;
    
  }

  urlarq(data:VeiculoArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  deletePessoa(data: number) {
    if (confirm("Tem certeza que deseja excluir a pessoa?")){
      this.subscription = this.pessoasVeiculosService.destroy(data).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso', data as string, 3);
          this.refresh();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
  }

  deleteAnalise(data: number) {
    if (confirm("Tem certeza que deseja excluir a análise?")){
      this.analisesVeiculosService.destroy(data).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso', data as string, 3);
          this.refresh();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
  }

  deleteOrganizacao(data: number){
    if (confirm("Tem certeza que deseja excluir a organização?")){
      this.organizacoesVeiculosService.destroy(data).subscribe({
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

  deleteArquivo(data?: number){
    if (confirm("Tem certeza que deseja excluir o arquivo?")){
      this.veiculosArquivosService.destroy(data||0).subscribe({
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

}
