import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { PessoaVeiculo } from "../../pessoas/formulario-pessoas-veiculos/pessoas-veiculos";
import { PessoasVeiculosService } from "../../pessoas/formulario-pessoas-veiculos/pessoas-veiculos.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";

@Component({
    selector: 'formulario-veiculos-pessoas',
    templateUrl: './formulario-veiculos-pessoas.component.html',
    styleUrls: ['./formulario-veiculos-pessoas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioVeiculosPessoasComponent{

    protected form!: FormGroup;

    protected pessoas$!: Observable<Pessoas>;

    protected subscription: any;
    protected subscription2: any;

    @Input() veiculo_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<PessoaVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private pessoasService: PessoasService,
        private pessoasVeiculosService: PessoasVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': ['', Validators.compose([
                Validators.required,
            ])],
            'veiculo_id': [''],
        });
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);
        this.subscription2 = this.pessoasService.index().subscribe({
            next: (data) => {
                data.forEach((element:any) => {
                    element.nome = `${element.nome } (${element.cpf})`
                });
                this.pessoas$ = of(data);
            }
        });
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
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);
        if(this.form.value.pessoa_id && this.form.value.veiculo_id){
            if(this.form.value.id){
                this.subscription = this.pessoasVeiculosService.update(this.form.value).subscribe({
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
                this.subscription = this.pessoasVeiculosService.store(this.form.value).subscribe({
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

    editar(data: PessoaVeiculo){
        this.form.patchValue(data);
    }
}