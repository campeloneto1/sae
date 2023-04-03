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
import { Analise } from '../analises';
import { AnalisesService } from '../analises.service';
import { AnaliseArquivo } from '../formulario-analises-arquivos/analises-arquivos';

@Component({
  selector: 'imprimir-analise',
  templateUrl: './imprimir-analise.component.html',
  styleUrls: ['./imprimir-analise.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
  ],
})
export class ImprimirAnaliseComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected analise$!: Observable<Analise>;

  protected user!: Usuario;
    protected date = new Date();
  protected subscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private analisesService: AnalisesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.analise$ = this.analisesService.show(this.id);

    this.user = this.sessionService.retornaUser();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.analise$ = this.analisesService.show(this.id);
  }
 
  urlarq(data:AnaliseArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  print(){

  }

 

}
