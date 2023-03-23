import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Marcas } from "../../marcas/marcas";
import { MarcasService } from "../../marcas/marcas.service";
import { Modelo } from "../modelos";
import { ModelosService } from "../modelos.service";

@Component({
    selector: 'formulario-modelos',
    templateUrl: './formulario-modelos.component.html',
    styleUrls: ['./formulario-modelos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioModelosComponent{

    protected form!: FormGroup;

    protected marcas$!: Observable<Marcas>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Modelo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private modelosService: ModelosService,
        private marcasService: MarcasService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
           
            'marca_id': ['', Validators.compose([
                Validators.required,
            ])],
        });

        this.marcas$ = this.marcasService.index();       
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.modelosService.update(this.form.value).subscribe({
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
            this.subscription = this.modelosService.store(this.form.value).subscribe({
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

    editar(data: Modelo){
        this.form.patchValue(data);
    }
}