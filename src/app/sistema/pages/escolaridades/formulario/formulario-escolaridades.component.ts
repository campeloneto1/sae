import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Escolaridade } from "../escolaridades";
import { EscolaridadesService } from "../escolaridades.service";

@Component({
    selector: 'formulario-escolaridades',
    templateUrl: './formulario-escolaridades.component.html',
    styleUrls: ['./formulario-escolaridades.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioEscolaridadesComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Escolaridade> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private escolaridadesService: EscolaridadesService,
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
            this.subscription = this.escolaridadesService.update(this.form.value).subscribe({
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
            this.subscription = this.escolaridadesService.store(this.form.value).subscribe({
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

    editar(data: Escolaridade){
        this.form.patchValue(data);
    }
}