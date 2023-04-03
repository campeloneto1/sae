import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { AnaliseCategoria } from "../analises-categorias";
import { AnalisesCategoriasService } from "../analises-categorias.service";

@Component({
    selector: 'formulario-analises-categorias',
    templateUrl: './formulario-analises-categorias.component.html',
    styleUrls: ['./formulario-analises-categorias.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioAnalisesCategoriasComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<AnaliseCategoria> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private analisesCategoriasService: AnalisesCategoriasService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(150)
            ])],  
            'gestor': [0],
            'restrito': [0],
            'tipo': [0],
            'previa': [0],     
            'sintese': [0],
            'endereco': [0],
        });
    
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.analisesCategoriasService.update(this.form.value).subscribe({
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
            this.subscription = this.analisesCategoriasService.store(this.form.value).subscribe({
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

    editar(data: AnaliseCategoria){
        this.form.patchValue(data);
    }
}