import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Veiculos } from "../../veiculos/veiculos";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { AnaliseVeiculo } from "../../analises/formulario-analises-veiculos/analises-veiculos";
import { AnalisesVeiculosService } from "../../analises/formulario-analises-veiculos/analises-veiculos.service";

@Component({
    selector: 'formulario-analises-veiculos',
    templateUrl: './formulario-analises-veiculos.component.html',
    styleUrls: ['./formulario-analises-veiculos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioAnalisesVeiculosComponent{

    protected form!: FormGroup;

    protected veiculos$!: Observable<Veiculos>;

    protected subscription: any;
    protected subscription2: any;

    @Input() analise_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<AnaliseVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private veiculosService: VeiculosService,
        private analisesVeiculosService: AnalisesVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'veiculo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'analise_id': [''],
            'lider': [''],
        });
        this.form.get('analise_id')?.patchValue(this.analise_id);
        this.veiculosService.index().subscribe({
            next: (data) => {
                data.forEach((veiculo) => {
                    veiculo.nome = `${veiculo.placa} (${veiculo.modelo?.marca.nome} ${veiculo.modelo?.nome})`;
                });
                this.veiculos$ = of(data);
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('analise_id')?.patchValue(this.analise_id);

        if(this.form.value.veiculo_id && this.form.value.analise_id){
            if(this.form.value.id){
                this.subscription = this.analisesVeiculosService.update(this.form.value).subscribe({
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
                this.subscription = this.analisesVeiculosService.store(this.form.value).subscribe({
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

    editar(data: AnaliseVeiculo){
        this.form.patchValue(data);
    }
}