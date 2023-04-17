import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { SessionService } from 'src/app/sistema/shared/session.service';
import { Usuario } from '../../usuarios/usuarios';
import { InvestigacaoSocial } from '../investigacoes-sociais';
import { FormularioVeiculosComponent } from '../../veiculos/formulario/formulario-veiculos.component';
import { FormularioPessoasVeiculosComponent } from '../../pessoas/formulario-pessoas-veiculos/formulario-pessoas-veiculos.component';
import { InvestigacoesSociaisService } from '../investigacoes-sociais.service';
import { PessoasVeiculosService } from '../../pessoas/formulario-pessoas-veiculos/pessoas-veiculos.service';
import { PessoaArquivo } from '../../pessoas/formulario-pessoas-arquivos/pessoas-arquivos';
import { Pessoa } from '../../pessoas/pessoas';
import { PessoasRedesSociaisService } from '../../pessoas/formulario-pessoas-redes-sociais/pessoas-redes-sociais.service';
import { PessoasVinculosService } from '../../pessoas/formulario-pessoas-vinculos/pessoas-vinculos.service';
import { FormularioInvestigacoesSociaisArquivosComponent } from '../formulario-investigacoes-sociais-arquivos/formulario-investigacoes-sociais-arquivos.component';
import { FormularioInvestigacoesSociaisBoletinsComponent } from '../formulario-investigacoes-sociais-boletins/formulario-investigacoes-sociais-boletins.component';
import { FormularioInvestigacoesSociaisCgdsComponent } from '../formulario-investigacoes-sociais-cgds/formulario-investigacoes-sociais-cgds.component';
import { FormularioInvestigacoesSociaisLotacoesComponent } from '../formulario-investigacoes-sociais-lotacoes/formulario-investigacoes-sociais-lotacoes.component';
import { FormularioPessoasVinculosComponent } from '../../pessoas/formulario-pessoas-vinculos/formulario-pessoas-vinculos.component';
import { FormularioPessoasRedesSociaisComponent } from '../../pessoas/formulario-pessoas-redes-sociais/formulario-pessoas-redes-sociais.component';
import { InvestigacoesSociaisArquivosService } from '../formulario-investigacoes-sociais-arquivos/investigacoes-sociais-arquivos.service';
import { InvestigacaoSocialArquivo } from '../formulario-investigacoes-sociais-arquivos/investigacoes-sociais-arquivos';
import { RedeSocial } from '../../redes-sociais/redes-sociais';
import { InvestigacoesSociaisCgdsService } from '../formulario-investigacoes-sociais-cgds/investigacoes-sociais-cgds.service';
import { InvestigacoesSociaisLotacoesService } from '../formulario-investigacoes-sociais-lotacoes/investigacoes-sociais-lotacoes.service';
import { InvestigacoesSociaisBoletinsService } from '../formulario-investigacoes-sociais-boletins/investigacoes-sociais-boletins.service';

@Component({
  selector: 'investigacao-social',
  templateUrl: './investigacao-social.component.html',
  styleUrls: ['./investigacao-social.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
    FormularioPessoasVeiculosComponent,
    FormularioPessoasVinculosComponent,
    FormularioPessoasRedesSociaisComponent,
    FormularioVeiculosComponent,
    FormularioInvestigacoesSociaisArquivosComponent,
    FormularioInvestigacoesSociaisBoletinsComponent,
    FormularioInvestigacoesSociaisCgdsComponent,
    FormularioInvestigacoesSociaisLotacoesComponent,
    RouterModule
  ],
})
export class InvestigacaoSocialComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected investigacaosocial$!: Observable<InvestigacaoSocial>;
  protected user!: Usuario;
  protected subscription: any;
  protected cadveiculo: boolean = false;
  protected arquivo!: InvestigacaoSocialArquivo;

  //protected arquivo!: PessoaArquivo;

  @ViewChild('fecharmodalvinculo') closebuttonVinculos: any;
  @ViewChild('fecharmodalredes') closebuttonRedesSociais: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;

  @ViewChild('fecharmodallotacoes') closebuttonLotacoes: any;
  @ViewChild('fecharmodalboletins') closebuttonBoletins: any;
  @ViewChild('fecharmodalcgds') closebuttonCgds: any;

  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private investigacoesSociaisService: InvestigacoesSociaisService,
    private investigacoesSociaisArquivosService: InvestigacoesSociaisArquivosService,
    private investigacoesSociaisCgdsService: InvestigacoesSociaisCgdsService,
    private investigacoesSociaisLotacoesService: InvestigacoesSociaisLotacoesService,
    private investigacoesSociaisBoletinsService: InvestigacoesSociaisBoletinsService,
    private pessoasVeiculosService: PessoasVeiculosService,
    private pessoasRedesSociaisService: PessoasRedesSociaisService,
    private pessoasVinculosService: PessoasVinculosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.retornaUser();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.investigacaosocial$ = this.investigacoesSociaisService.show(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.investigacaosocial$ = this.investigacoesSociaisService.show(this.id);
  }

  cadastroVeiculo() {
    //this.refresh();
    this.cadveiculo = false;
  }

  cancelVeiculo() {
    this.cadveiculo = false;
  }

  sudmitVeiculo(){
    this.closebuttonVeiculos.nativeElement.click();
    this.refresh();
  }

  sudmitVinculo(){
    this.closebuttonVinculos.nativeElement.click();
    this.refresh();
  }

  sudmitRedes(){
    this.closebuttonRedesSociais.nativeElement.click();
    this.refresh();
  }

  sudmitLotacoes(){
    this.closebuttonLotacoes.nativeElement.click();
    this.refresh();
  }

  sudmitBoletins(){
    this.closebuttonBoletins.nativeElement.click();
    this.refresh();
  }

  sudmitCgds(){
    this.closebuttonCgds.nativeElement.click();
    this.refresh();
  }
 
  
  sudmitArquivo(){
    this.closebuttonArquivos.nativeElement.click();
    this.refresh();
  }

  showArquivo(data:InvestigacaoSocialArquivo){
    this.arquivo = data;
    
  }

  googlemaps(data:Pessoa){
    //return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8&output=embed`);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8`);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }

  urlfoto2(data:RedeSocial):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.pivot.foto}`);
  }

  urlarq(data:InvestigacaoSocialArquivo):any{
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

  deleteCgd(data: number) {
    if (confirm("Tem certeza que deseja excluir a cgd?")){
      this.subscription = this.investigacoesSociaisCgdsService.destroy(data).subscribe({
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

  deleteLotacao(data: number) {
    if (confirm("Tem certeza que deseja excluir a lotação?")){
      this.subscription = this.investigacoesSociaisLotacoesService.destroy(data).subscribe({
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

  deleteBoletim(data: number) {
    if (confirm("Tem certeza que deseja excluir o boletim?")){
      this.subscription = this.investigacoesSociaisBoletinsService.destroy(data).subscribe({
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
       this.investigacoesSociaisArquivosService.destroy(data||0).subscribe({
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
