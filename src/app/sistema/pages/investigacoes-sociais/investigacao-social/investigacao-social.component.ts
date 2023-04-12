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
    FormularioVeiculosComponent,
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
  protected arquivo!: PessoaArquivo;

  //protected arquivo!: PessoaArquivo;

  @ViewChild('fecharmodalvinculos') closebuttonVinculos: any;
  @ViewChild('fecharmodalredes') closebuttonRedesSociais: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private investigacoesSociaisService: InvestigacoesSociaisService,
    private pessoasVeiculosService: PessoasVeiculosService,
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

  
  sudmitArquivo(){
    this.closebuttonArquivos.nativeElement.click();
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

 

 

  deleteArquivo(data?: number){
    // if (confirm("Tem certeza que deseja excluir o arquivo?")){
    //   this.pessoasArquivosService.destroy(data||0).subscribe({
    //       next: (data) => {
    //           this.sharedService.toast("Sucesso", data as string, 3);
    //           this.refresh();
    //       },
    //       error: (error) => {
    //           this.sharedService.toast('Error!', error.erro as string, 2);
    //       }
    //   });
    // }
  }

}
