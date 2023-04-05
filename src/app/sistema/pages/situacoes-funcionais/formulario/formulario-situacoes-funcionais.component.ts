import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { SituacaoFuncional } from "../situacoes-funcionais";
import { SituacoesFuncionaisService } from "../situacoes-funcionais.service";

@Component({
    selector: 'formulario-situacoes-funcionais',
    templateUrl: './formulario-situacoes-funcionais.component.html',
    styleUrls: ['./formulario-situacoes-funcionais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioSituacoesFuncionaisComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<SituacaoFuncional> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private situacoesFuncionaisService: SituacoesFuncionaisService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
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
            this.subscription = this.situacoesFuncionaisService.update(this.form.value).subscribe({
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
            this.subscription = this.situacoesFuncionaisService.store(this.form.value).subscribe({
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

    editar(data: SituacaoFuncional){
        this.form.patchValue(data);
    }
}