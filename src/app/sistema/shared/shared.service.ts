import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environments";
import { Cidades } from '../pages/cidades/cidades';
import { Estados } from '../pages/estados/estados';
import { EstadosService } from '../pages/estados/estados.service';
import { Paises } from '../pages/paises/paises';
import { PaisesService } from '../pages/paises/paises.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const API = environment.url;

@Injectable({providedIn: 'root'})
export class SharedService{

  protected editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Observação...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: environment.url+'/upload-image',
    //upload: (file: File) => { console.log(file) },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['strikeThrough',
      'subscript',
      'superscript',],
    ]
};

      private dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true,
        paging: true
      };          

      constructor(private toastr: ToastrService,
        private paisesService: PaisesService,
        private estadosService: EstadosService) {}
    
      toast(titulo: string, mensagem: string, tipo: number) {
        if(tipo == 1){
          this.toastr.success(mensagem, titulo);
        }
        if(tipo == 2){
          this.toastr.error(mensagem, titulo);
        }
        if(tipo == 3){
          this.toastr.info(mensagem, titulo);
        }
        if(tipo == 4){
          this.toastr.warning(mensagem, titulo);
        }
      }
    
      
      getPaises(): Observable<Paises>{
        return this.paisesService.index();
      }
    
      getEstados(id: number): Observable<Estados>{
        return this.paisesService.where(id);
      }
    
      getCidades(id: number): Observable<Cidades>{
        return this.estadosService.where(id);
      }
    
      getDtOptions(): DataTables.Settings{
        return this.dtOptions;
      }
 
}