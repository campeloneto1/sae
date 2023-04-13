import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { CgdEnvolvimentoTipo } from "../cgds-envolvimentos-tipos";
import { CgdsEnvolvimentosTiposService } from "../cgds-envolvimentos-tipos.service";

@Component({
    selector: 'formulario-cgds-envolvimentos-tipos',
    templateUrl: './formulario-cgds-envolvimentos-tipos.component.html',
    styleUrls: ['./formulario-cgds-envolvimentos-tipos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioCgdsEnvolvimentosTiposComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<CgdEnvolvimentoTipo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private cgdsEnvolvimentosTiposService: CgdsEnvolvimentosTiposService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],    
            
        });
    
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.cgdsEnvolvimentosTiposService.update(this.form.value).subscribe({
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
            this.subscription = this.cgdsEnvolvimentosTiposService.store(this.form.value).subscribe({
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

    editar(data: CgdEnvolvimentoTipo){
        this.form.patchValue(data);
    }
}