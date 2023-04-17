import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { Usuario } from '../../usuarios/usuarios';
import { SessionService } from 'src/app/sistema/shared/session.service';
import { InvestigacaoSocial } from '../investigacoes-sociais';
import { InvestigacoesSociaisService } from '../investigacoes-sociais.service';
import { Pessoa } from '../../pessoas/pessoas';
import { PessoaArquivo } from '../../pessoas/formulario-pessoas-arquivos/pessoas-arquivos';
import { RedeSocial } from '../../redes-sociais/redes-sociais';
import { InvestigacaoSocialArquivo } from '../formulario-investigacoes-sociais-arquivos/investigacoes-sociais-arquivos';

@Component({
  selector: 'imprimir-investigacao-social',
  templateUrl: './imprimir-investigacao-social.component.html',
  styleUrls: ['./imprimir-investigacao-social.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
  ],
})
export class ImprimirInvestigacaoSocialComponent implements OnInit, OnDestroy {
  
  protected pagecount = 0;
  protected IMG = environment.image;
  protected id!: number;
  protected investigacaosocial$!: Observable<InvestigacaoSocial>;
  protected cifra: string = '';
  protected user!: Usuario;
    protected date = new Date();
  protected subscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private investigacoesSociaisService: InvestigacoesSociaisService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.investigacaosocial$ = this.investigacoesSociaisService.show(this.id);

    this.user = this.sessionService.retornaUser();
    this.cifra =  this.user.nome.split(" ")[0].substring(0,1) +  this.user.nome.split(" ")[this.user.nome.split(" ").length -1].substring(0,1) + this.user.cpf.substring(0,3);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.investigacaosocial$ = this.investigacoesSociaisService.show(this.id);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }
 
  urlarq(data:PessoaArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  urlarq2(data:InvestigacaoSocialArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  urlfoto2(data:RedeSocial):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.pivot.foto}`);
  }

  countpage(){
    
  }

 

}
