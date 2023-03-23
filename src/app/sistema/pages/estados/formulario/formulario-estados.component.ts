import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Paises } from "../../paises/paises";
import { PaisesService } from "../../paises/paises.service";
import { Estado } from "../estados";
import { EstadosService } from "../estados.service";

@Component({
    selector: 'formulario-estados',
    templateUrl: './formulario-estados.component.html',
    styleUrls: ['./formulario-estados.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioEstadosComponent{

    protected form!: FormGroup;

    protected paises$!: Observable<Paises>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Estado> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private estadosService: EstadosService,
        private paisesService: PaisesService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'uf': ['', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(2)
            ])],
            'pais_id': ['', Validators.compose([
                Validators.required,
            ])],
        });

        this.paises$ = this.paisesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.estadosService.update(this.form.value).subscribe({
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
            this.subscription = this.estadosService.store(this.form.value).subscribe({
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

    editar(data: Estado){
        this.form.patchValue(data);
    }
}