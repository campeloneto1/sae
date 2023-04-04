import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { ArquivoTipo } from "../arquivos-tipos";
import { ArquivosTiposService } from "../arquivos-tipos.service";

@Component({
    selector: 'formulario-arquivos-tipos',
    templateUrl: './formulario-arquivos-tipos.component.html',
    styleUrls: ['./formulario-arquivos-tipos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioArquivosTiposComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<ArquivoTipo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private arquivosTiposService: ArquivosTiposService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],  
            'foto': [''],
            'video': [''],        
            'audio': [''],
            'texto': [''],
            'pdf': [''],   
            'link': [''],          
        });
    
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.arquivosTiposService.update(this.form.value).subscribe({
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
            this.subscription = this.arquivosTiposService.store(this.form.value).subscribe({
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

    editar(data: ArquivoTipo){
        this.form.patchValue(data);
    }
}