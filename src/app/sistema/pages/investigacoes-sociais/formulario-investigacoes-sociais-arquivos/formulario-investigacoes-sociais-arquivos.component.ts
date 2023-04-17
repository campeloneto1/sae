import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { environment } from "src/environments/environments";
import { ArquivosTipos } from "../../arquivos-tipos/arquivos-tipos";
import { ArquivosTiposService } from "../../arquivos-tipos/arquivos-tipos.service";
import { InvestigacaoSocialArquivo } from "./investigacoes-sociais-arquivos";
import { InvestigacoesSociaisArquivosService } from "./investigacoes-sociais-arquivos.service";

@Component({
    selector: 'formulario-investigacoes-sociais-arquivos',
    templateUrl: './formulario-investigacoes-sociais-arquivos.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-arquivos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisArquivosComponent implements OnInit, OnDestroy{

    protected form!: FormGroup;

    protected arquivostipos$!: Observable<ArquivosTipos>;

    @Input() investigacao_social_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocialArquivo> = new EventEmitter();

    protected subscription: any;
    protected subscription2: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private investigacoesSociaisArquivosService: InvestigacoesSociaisArquivosService,
        private sharedService: SharedService,
        private arquivosTipoService: ArquivosTiposService,
        private http: HttpClient
    ){}
    

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],           
            'investigacao_social_id': [''],
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
            'restrito': [''],
        });
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        this.arquivostipos$ = this.arquivosTipoService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);

        if(this.form.value.investigacao_social_id && this.form.value.nome){
            if(this.form.value.id){
                this.subscription = this.investigacoesSociaisArquivosService.update(this.form.value).subscribe({
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
                this.subscription = this.investigacoesSociaisArquivosService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocialArquivo){
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
          myFormData.append('id', this.investigacao_social_id+'');
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