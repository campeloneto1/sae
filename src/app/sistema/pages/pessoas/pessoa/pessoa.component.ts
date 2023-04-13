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
import { SessionService } from 'src/app/sistema/shared/session.service';
import { Usuario } from '../../usuarios/usuarios';
import { FormularioPessoasRedesSociaisComponent } from '../formulario-pessoas-redes-sociais/formulario-pessoas-redes-sociais.component';
import { RedeSocial } from '../../redes-sociais/redes-sociais';
import { PessoasRedesSociaisService } from '../formulario-pessoas-redes-sociais/pessoas-redes-sociais.service';
import { PessoasVinculosService } from '../formulario-pessoas-vinculos/pessoas-vinculos.service';
import { FormularioPessoasVinculosComponent } from '../formulario-pessoas-vinculos/formulario-pessoas-vinculos.component';


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
    FormularioPessoasVinculosComponent,
    FormularioVeiculosComponent,
    FormularioPessoasAnalisesComponent,
    FormularioPessoasOrganizacoesComponent,
    FormularioPessoasRedesSociaisComponent,
    FormularioPessoasArquivosComponent,
    RouterModule
  ],
})
export class PessoaComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected pessoa$!: Observable<Pessoa>;
  protected user!: Usuario;
  protected subscription: any;
  protected cadveiculo: boolean = false;

  protected arquivo!: PessoaArquivo;

  @ViewChild('fecharmodalanalises') closebuttonAnalises: any;
  
  @ViewChild('fecharmodalorganizacoes') closebuttonOrganizacao: any;
  @ViewChild('fecharmodalredessociais') closebuttonRedesSociais: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;
  @ViewChild('fecharmodalvinculos') closebuttonVinculos: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private pessoasService: PessoasService,
    private pessoasVeiculosService: PessoasVeiculosService,
    private pessoasVinculosService: PessoasVinculosService,
    private pessoasRedesSociaisService: PessoasRedesSociaisService,
    private analisesPessoasService: AnalisesPessoasService,
    private organizacoesPessoasService: OrganizacoesPessoasService,
    private pessoasArquivosService: PessoasArquivosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.retornaUser();
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

  sudmitRedeSocial(){
    this.closebuttonRedesSociais.nativeElement.click();
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

  sudmitVinculo(){
    this.closebuttonVinculos.nativeElement.click();
    this.refresh();
  }

  showArquivo(data:PessoaArquivo){
    this.arquivo = data;
    
  }

  googlemaps(data:Pessoa){
    //return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8&output=embed`);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8`);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }

  urlarq(data:PessoaArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  urlfoto2(data:RedeSocial):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.pivot.foto}`);
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

  deleteRedeSocial(data: number) {
    if (confirm("Tem certeza que deseja excluir a rede social?")){
      this.subscription = this.pessoasRedesSociaisService.destroy(data).subscribe({
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

  deleteVinculo(data: number) {
    if (confirm("Tem certeza que deseja excluir o vínculo?")){
      this.subscription = this.pessoasVinculosService.destroy(data).subscribe({
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
