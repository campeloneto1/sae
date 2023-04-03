import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { FormularioPessoasVeiculosComponent } from '../formulario-pessoas-veiculos/formulario-pessoas-veiculos.component';
import { Pessoa } from '../pessoas';
import { PessoasVeiculosService } from '../formulario-pessoas-veiculos/pessoas-veiculos.service';
import { PessoasService } from '../pessoas.service';
import { AnalisesPessoasService } from '../../analises/formulario-analises-pessoas/analises-pessoas.service';
import { FormularioVeiculosComponent } from '../../veiculos/formulario/formulario-veiculos.component';
import { FormularioPessoasAnalisesComponent } from '../formulario-pessoas-analises/formulario-pessoas-analises.component';
import { OrganizacoesPessoasService } from '../../organizacoes/formulario-organizacoes-pessoas/organizacoes-pessoas.service';
import { FormularioPessoasOrganizacoesComponent } from '../formulario-pessoas-organizacoes/formulario-pessoas-organizacoes.component';
import { PessoasArquivosService } from '../formulario-pessoas-arquivos/pessoas-arquivos.service';
import { FormularioPessoasArquivosComponent } from '../formulario-pessoas-arquivos/formulario-pessoas-arquivos.component';
import { PessoaArquivo } from '../formulario-pessoas-arquivos/pessoas-arquivos';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 


@Component({
  selector: 'pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
    FormularioPessoasVeiculosComponent,
    FormularioVeiculosComponent,
    FormularioPessoasAnalisesComponent,
    FormularioPessoasOrganizacoesComponent,
    FormularioPessoasArquivosComponent,
    RouterModule
  ],
})
export class PessoaComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected pessoa$!: Observable<Pessoa>;

  protected subscription: any;
  protected cadveiculo: boolean = false;

  protected arquivo!: PessoaArquivo;

  @ViewChild('fecharmodalanalises') closebuttonAnalises: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;
  @ViewChild('fecharmodalorganizacoes') closebuttonOrganizacao: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private pessoasService: PessoasService,
    private pessoasVeiculosService: PessoasVeiculosService,
    private analisesPessoasService: AnalisesPessoasService,
    private organizacoesPessoasService: OrganizacoesPessoasService,
    private pessoasArquivosService: PessoasArquivosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pessoa$ = this.pessoasService.show(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.pessoa$ = this.pessoasService.show(this.id);
  }

  cadastroVeiculo() {
    //this.refresh();
    this.cadveiculo = false;
  }

  cancelVeiculo() {
    this.cadveiculo = false;
  }

  sudmitAnalise(){
    this.closebuttonAnalises.nativeElement.click();
    this.refresh();
  }

  sudmitOrganizacao(){
    this.closebuttonOrganizacao.nativeElement.click();
    this.refresh();
  }

  sudmitVeiculo(){
    this.closebuttonVeiculos.nativeElement.click();
    this.refresh();
  }

  sudmitArquivo(){
    this.closebuttonArquivos.nativeElement.click();
    this.refresh();
  }

  showArquivo(data:PessoaArquivo){
    this.arquivo = data;
    
  }

  googlemaps(data:Pessoa){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8&output=embed`);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }

  urlarq(data:PessoaArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  deleteVeiculo(data: number) {
    if (confirm("Tem certeza que deseja excluir o veículo?")){
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
      this.analisesPessoasService.destroy(data).subscribe({
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
      this.organizacoesPessoasService.destroy(data).subscribe({
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
      this.pessoasArquivosService.destroy(data||0).subscribe({
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
