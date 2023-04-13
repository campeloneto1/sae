import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { VinculosTipos } from "../../vinculos-tipos/vinculos-tipos";
import { VinculosTiposService } from "../../vinculos-tipos/vinculos-tipos.service";
import { PessoaVinculo } from "./pessoas-vinculos";
import { PessoasVinculosService } from "./pessoas-vinculos.service";

@Component({
    selector: 'formulario-pessoas-vinculos',
    templateUrl: './formulario-pessoas-vinculos.component.html',
    styleUrls: ['./formulario-pessoas-vinculos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasVinculosComponent{

    protected form!: FormGroup;

    protected vinculostipos$!: Observable<VinculosTipos>;

    protected subscription: any;
    protected subscription2: any;

    @Input() pessoa_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<PessoaVinculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private vinculosTiposService: VinculosTiposService,
        private pessoasVinculosService: PessoasVinculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': [''],
            'vinculo_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'cpf': ['', Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'observacao': [''],
        });
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        this.vinculostipos$ = this.vinculosTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    cadastrar(){
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        if(this.form.value.pessoa_id && this.form.value.nome && this.form.value.vinculo_tipo_id){
            if(this.form.value.id){
                this.subscription = this.pessoasVinculosService.update(this.form.value).subscribe({
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
                this.subscription = this.pessoasVinculosService.store(this.form.value).subscribe({
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
    }

    editar(data: PessoaVinculo){
        this.form.patchValue(data);
    }
}