import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Veiculos } from "../../veiculos/veiculos";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { PessoaVeiculo } from "../pessoas-veiculos";
import { PessoasVeiculosService } from "../pessoas-veiculos.service";

@Component({
    selector: 'formulario-pessoas-veiculos',
    templateUrl: './formulario-pessoas-veiculos.component.html',
    styleUrls: ['./formulario-pessoas-veiculos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasVeiculosComponent{

    protected form!: FormGroup;

    protected veiculos$!: Observable<Veiculos>;

    protected subscription: any;

    @Input() pessoa_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<PessoaVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private veiculosService: VeiculosService,
        private pessoasVeiculosService: PessoasVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': [''],
            'veiculo_id': ['', Validators.compose([
                Validators.required,
            ])],
        });
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        this.veiculosService.index().subscribe({
            next: (data) => {
                data.forEach((element:any) => {
                    element.nome = `${element.placa } (${element.modelo.nome} / ${element.modelo.marca.nome})`
                });
                this.veiculos$ = of(data);
            }
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
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