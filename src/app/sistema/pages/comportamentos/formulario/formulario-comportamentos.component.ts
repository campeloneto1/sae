import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Comportamento } from "../comportamentos";
import { ComportamentosService } from "../comportamentos.service";

@Component({
    selector: 'formulario-comportamentos',
    templateUrl: './formulario-comportamentos.component.html',
    styleUrls: ['./formulario-comportamentos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioComportamentosComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Comportamento> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private comportamentosService: ComportamentosService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
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
            this.subscription = this.comportamentosService.update(this.form.value).subscribe({
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
            this.subscription = this.comportamentosService.store(this.form.value).subscribe({
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

    editar(data: Comportamento){
        this.form.patchValue(data);
    }
}