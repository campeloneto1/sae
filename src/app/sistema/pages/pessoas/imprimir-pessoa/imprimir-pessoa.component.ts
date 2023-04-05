import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { Pessoa } from '../pessoas';
import { PessoasService } from '../pessoas.service';
import { PessoaArquivo } from '../formulario-pessoas-arquivos/pessoas-arquivos';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { Usuario } from '../../usuarios/usuarios';
import { SessionService } from 'src/app/sistema/shared/session.service';

@Component({
  selector: 'imprimir-pessoa',
  templateUrl: './imprimir-pessoa.component.html',
  styleUrls: ['./imprimir-pessoa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
  ],
})
export class ImprimirPessoaComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected pessoa$!: Observable<Pessoa>;
  protected cifra: string = '';
  protected user!: Usuario;
    protected date = new Date();
  protected subscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private pessoasService: PessoasService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pessoa$ = this.pessoasService.show(this.id);

    this.user = this.sessionService.retornaUser();
    this.cifra =  this.user.nome.split(" ")[0].substring(0,1) +  this.user.nome.split(" ")[this.user.nome.split(" ").length -1].substring(0,1) + this.user.cpf.substring(0,3);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.pessoa$ = this.pessoasService.show(this.id);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }
 
  urlarq(data:PessoaArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  print(){

  }

 

}
