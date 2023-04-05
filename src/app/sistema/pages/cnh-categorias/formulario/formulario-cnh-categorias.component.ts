import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { CnhCategoria } from "../cnh-categorias";
import { CnhCategoriasService } from "../cnh-categorias.service";

@Component({
    selector: 'formulario-cnh-categorias',
    templateUrl: './formulario-cnh-categorias.component.html',
    styleUrls: ['./formulario-cnh-categorias.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioCnhCategoriasComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<CnhCategoria> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private cnhCategoriasService: CnhCategoriasService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(3)
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
            this.subscription = this.cnhCategoriasService.update(this.form.value).subscribe({
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
            this.subscription = this.cnhCategoriasService.store(this.form.value).subscribe({
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

    editar(data: CnhCategoria){
        this.form.patchValue(data);
    }
}