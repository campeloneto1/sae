import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Batalhoes } from "../../batalhoes/batalhoes";
import { BatalhoesService } from "../../batalhoes/batalhoes.service";
import { Companhia } from "../companhias";
import { CompanhiasService } from "../companhias.service";

@Component({
    selector: 'formulario-companhias',
    templateUrl: './formulario-companhias.component.html',
    styleUrls: ['./formulario-companhias.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioCompanhiasComponent{

    protected form!: FormGroup;

    protected batalhoes$!: Observable<Batalhoes>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Companhia> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private companhiasService: CompanhiasService,
        private batalhoesService: BatalhoesService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'abreviatura': ['', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
            'batalhao_id': ['', Validators.compose([
                Validators.required,
            ])],
        });

        this.batalhoes$ = this.batalhoesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.companhiasService.update(this.form.value).subscribe({
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
            this.subscription = this.companhiasService.store(this.form.value).subscribe({
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

    editar(data: Companhia){
        this.form.patchValue(data);
    }
}