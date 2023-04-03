import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { environment } from "src/environments/environments";
import { ArquivosTipos } from "../../arquivos-tipos/arquivos-tipos";
import { ArquivosTiposService } from "../../arquivos-tipos/arquivos-tipos.service";
import { OrganizacaoArquivo } from "./organizacoes-arquivos";
import { OrganizacoesArquivosService } from "./organizacoes-arquivos.service";

@Component({
    selector: 'formulario-organizacoes-arquivos',
    templateUrl: './formulario-organizacoes-arquivos.component.html',
    styleUrls: ['./formulario-organizacoes-arquivos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioOrganizacoesArquivosComponent{

    protected form!: FormGroup;

    protected arquivostipos$!: Observable<ArquivosTipos>;

    protected subscription: any;
    protected subscription2: any;

    @Input() organizacao_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<OrganizacaoArquivo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private arquivosTipoService: ArquivosTiposService,
        private organizacoesArquivosService: OrganizacoesArquivosService,
        private http: HttpClient
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'organizacao_id': [''],
            'arquivo_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'nome': ['', Validators.compose([
                Validators.required,
            ])],
            'arquivo': ['', Validators.compose([
                Validators.required,
            ])],
            'file': ['', Validators.compose([
                Validators.required,
            ])],
        });
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);
        this.arquivostipos$ = this.arquivosTipoService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);

        if(this.form.value.organizacao_id && this.form.value.nome){
            if(this.form.value.id){
                this.subscription = this.organizacoesArquivosService.update(this.form.value).subscribe({
                    next: (data) => {
                        this.sharedService.toast("Sucesso", data as string, 3);
                        this.form.reset();
                        this.refresh.emit();
                    },
                    error: (error) =>{
                        this.sharedService.toast('Error!', error.erro as string, 2);
                    }
                });
            }else{
                this.subscription = this.organizacoesArquivosService.store(this.form.value).subscribe({
                    next: (data) => {
                        this.sharedService.toast("Sucesso", data as string, 1);
                        this.form.reset();
                        this.refresh.emit();
                    },
                    error: (error) =>{
                        this.sharedService.toast('Error!', error.erro as string, 2);
                    }
                });
            }
        }
    }

    editar(data: OrganizacaoArquivo){
        this.form.patchValue(data);
    }

    fileEvent(e: any){
        var filedata = e.target.files[0];
        //console.log(this.filedata);
    
        var myFormData = new FormData();
          const headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
          myFormData.append('file', filedata);
          myFormData.append('id', this.organizacao_id+'');
          /* Image Post Request */
          this.http.post(`${environment.url}/upload-arquivo`, myFormData, {
          headers: headers
          }).subscribe({
            next: data => {       
                //console.log(data);
                this.form.get('arquivo')?.patchValue(data);
             },
             error: (error) => {
              //console.log(error)
               this.sharedService.toast('Error!', error.error.erro as string, 4);
             }
          });  
      }
}