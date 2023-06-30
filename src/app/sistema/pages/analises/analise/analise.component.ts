import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TituloComponent } from 'src/app/sistema/components/titulo/titulo.component';
import { SharedModule } from 'src/app/sistema/shared/shared.module';
import { SharedService } from 'src/app/sistema/shared/shared.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from "@angular/platform-browser"; 
import { AnalisesService } from '../analises.service';
import { AnalisesPessoasService } from '../formulario-analises-pessoas/analises-pessoas.service';
import { AnalisesVeiculosService } from '../formulario-analises-veiculos/analises-veiculos.service';
import { AnalisesArquivosService } from '../formulario-analises-arquivos/analises-arquivos.service';
import { Analise } from '../analises';
import { AnaliseArquivo } from '../formulario-analises-arquivos/analises-arquivos';
import { FormularioAnalisesArquivosComponent } from '../formulario-analises-arquivos/formulario-analises-arquivos.component';
import { FormularioAnalisesPessoasComponent } from '../formulario-analises-pessoas/formulario-analises-pessoas.component';
import { FormularioAnalisesVeiculosComponent } from '../formulario-analises-veiculos/formulario-analises-veiculos.component';
import { Usuario } from '../../usuarios/usuarios';
import { SessionService } from 'src/app/sistema/shared/session.service';
import { Pessoa } from '../../pessoas/pessoas';



@Component({
  selector: 'analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TituloComponent,
    RouterModule,
    FormularioAnalisesArquivosComponent,
    FormularioAnalisesPessoasComponent,
    FormularioAnalisesVeiculosComponent
  ],
})
export class AnaliseComponent implements OnInit, OnDestroy {
  
  protected IMG = environment.image;
  protected id!: number;
  protected analise$!: Observable<Analise>;
  protected user!: Usuario;
  protected arquivo!: AnaliseArquivo;

  protected subscription: any;

  @ViewChild('fecharmodalpessoa') closebuttonPessoas: any;
  @ViewChild('fecharmodalveiculo') closebuttonVeiculos: any;
  @ViewChild('fecharmodalarquivos') closebuttonArquivos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private analisesService: AnalisesService,
    private sessionService: SessionService,
    private analisesPessoasService: AnalisesPessoasService,
    private analisesVeiculosService: AnalisesVeiculosService,
    private analisesArquivosService: AnalisesArquivosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.retornaUser();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.analise$ = this.analisesService.show(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refresh() {
    this.analise$ = this.analisesService.show(this.id);
  }
  
  googlemaps(data:Analise){
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

  showArquivo(data:AnaliseArquivo){
    this.arquivo = data;
    
  }

  urlarq(data:AnaliseArquivo):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.arquivo}`);
  }

  urlfoto(data:Pessoa):any{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.IMG}/${data.foto}`);
  }


  deletePessoa(data: number) {
    if (confirm("Tem certeza que deseja excluir a pessoa?")){
      this.subscription = this.analisesPessoasService.destroy(data).subscribe({
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


  deleteArquivo(data?: number){
    if (confirm("Tem certeza que deseja excluir o arquivo?")){
      this.analisesArquivosService.destroy(data||0).subscribe({
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
