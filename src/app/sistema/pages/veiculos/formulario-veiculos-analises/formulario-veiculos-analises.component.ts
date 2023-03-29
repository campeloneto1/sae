import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Analises } from "../../analises/analises";
import { AnalisesService } from "../../analises/analises.service";
import { AnaliseVeiculo } from "../../analises/formulario-analises-veiculos/analises-veiculos";
import { AnalisesVeiculosService } from "../../analises/formulario-analises-veiculos/analises-veiculos.service";

@Component({
    selector: 'formulario-veiculos-analises',
    templateUrl: './formulario-veiculos-analises.component.html',
    styleUrls: ['./formulario-veiculos-analises.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioVeiculosAnalisesComponent{

    protected form!: FormGroup;

    protected analises$!: Observable<Analises>;

    protected subscription: any;
    protected subscription2: any;

    @Input() veiculo_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<AnaliseVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private analisesService: AnalisesService,
        private analisesVeiculosService: AnalisesVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'veiculo_id': [''],
            'analise_id': ['', Validators.compose([
                Validators.required,
            ])],
            'lider': [''],
        });
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);
        this.analises$ = this.analisesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);

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