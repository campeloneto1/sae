import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { Organizacao } from '../organizacoes';
import { OrganizacaoArquivo } from '../formulario-organizacoes-arquivos/organizacoes-arquivos';
import { VeiculosService } from '../../veiculos/veiculos.service';
import { OrganizacoesVeiculosService } from '../formulario-organizacoes-veiculos/organizacoes-veiculos.service';
import { OrganizacoesArquivosService } from '../formulario-organizacoes-arquivos/organizacoes-arquivos.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { OrganizacoesService } from '../organizacoes.service';
import { OrganizacoesPessoasService } from '../formulario-organizacoes-pessoas/organizacoes-pessoas.service';
import { FormularioOrganizacoesArquivosComponent } from '../formulario-organizacoes-arquivos/formulario-organizacoes-arquivos.component';
import { FormularioOrganizacoesPessoasComponent } from '../formulario-organizacoes-pessoas/formulario-organizacoes-pessoas.component';
import { FormularioOrganizacoesVeiculosComponent } from '../formulario-organizacoes-veiculos/formulario-organizacoes-veiculos.component';
import { Usuario } from '../../usuarios/usuarios';
import { SessionService } from 'src/app/sistema/shared/session.service';


@Component({
  selector: 'organizacao',
  templateUrl: './organizacao.component.html',
  styleUrls: ['./organizacao.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
    RouterModule,
    FormularioOrganizacoesArquivosComponent,
    FormularioOrganizacoesPessoasComponent,
    FormularioOrganizacoesVeiculosComponent
  ],
})
export class OrganizacaoComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected organizacao$!: Observable<Organizacao>;
  protected user!: Usuario;
  protected arquivo!: OrganizacaoArquivo;

  protected subscription: any;

  @ViewChild('fecharmodalpessoa') closebuttonPessoas: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private organizacoesService: OrganizacoesService,
    private organizacoesPessoasService: OrganizacoesPessoasService,
    private organizacoesVeiculosService: OrganizacoesVeiculosService,
    private organizacoesArquivosService: OrganizacoesArquivosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.retornaUser();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.organizacao$ = this.organizacoesService.show(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.organizacao$ = this.organizacoesService.show(this.id);
  }

  googlemaps(data:Organizacao){
    //console.log('aaaaaaa');
    //return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8&output=embed`);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${data.rua?.replace(" ", "+")},${data.numero?.replace(" ", "+")},${data.bairro?.replace(" ", "+")},${data.cidade?.nome?.replace(" ", "+")}&z=15&ie=UTF8`);
  }


  sudmitVeiculo(){
    this.closebuttonVeiculos.nativeElement.click();
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



  showArquivo(data:OrganizacaoArquivo){
    this.arquivo = data;
    
  }

  urlarq(data:OrganizacaoArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  deletePessoa(data: number) {
    if (confirm("Tem certeza que deseja excluir a pessoa?")){
      this.subscription = this.organizacoesPessoasService.destroy(data).subscribe({
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
      this.organizacoesVeiculosService.destroy(data).subscribe({
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
      this.organizacoesArquivosService.destroy(data||0).subscribe({
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
