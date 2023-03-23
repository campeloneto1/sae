import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, timeout } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Estados } from "../../estados/estados";
import { Paises } from "../../paises/paises";
import { PaisesService } from "../../paises/paises.service";
import { Cidade } from "../cidades";
import { CidadesService } from "../cidades.service";

@Component({
    selector: 'formulario-cidades',
    templateUrl: './formulario-cidades.component.html',
    styleUrls: ['./formulario-cidades.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioCidadesComponent{

    protected form!: FormGroup;

    protected estados$!: Observable<Estados>;
    protected paises$!: Observable<Paises>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Cidade> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private paisesService: PaisesService,
        private cidadesService: CidadesService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'estado_id': ['', Validators.compose([
                Validators.required,
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

    getEstados(){
        if(this.form.value.pais_id){
            this.estados$ = this.paisesService.where(this.form.value.pais_id);
        }
        
    }

    cadastrar(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.form.value.id){
            this.subscription = this.cidadesService.update(this.form.value).subscribe({
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
            this.subscription = this.cidadesService.store(this.form.value).subscribe({
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

    editar(data: Cidade){
        this.form.patchValue(data);
        
        this.form.get('pais_id')?.patchValue(data.estado.pais_id);
        this.getEstados();
    }

}