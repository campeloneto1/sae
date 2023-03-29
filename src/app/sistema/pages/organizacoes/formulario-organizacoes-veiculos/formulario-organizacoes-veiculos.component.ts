import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Veiculos } from "../../veiculos/veiculos";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { OrganizacaoVeiculo } from "./organizacoes-veiculos";
import { OrganizacoesVeiculosService } from "./organizacoes-veiculos.service";

@Component({
    selector: 'formulario-organizacoes-veiculos',
    templateUrl: './formulario-organizacoes-veiculos.component.html',
    styleUrls: ['./formulario-organizacoes-veiculos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioOrganizacoesVeiculosComponent{

    protected form!: FormGroup;

    protected veiculos$!: Observable<Veiculos>;

    protected subscription: any;
    protected subscription2: any;

    @Input() organizacao_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<OrganizacaoVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private veiculosService: VeiculosService,
        private organizacoesVeiculosService: OrganizacoesVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'veiculo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'organizacao_id': [''],
            'lider': [''],
        });
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);
        this.veiculos$ = this.veiculosService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);

        if(this.form.value.veiculo_id && this.form.value.organizacao_id){
            if(this.form.value.id){
                this.subscription = this.organizacoesVeiculosService.update(this.form.value).subscribe({
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
                this.subscription = this.organizacoesVeiculosService.store(this.form.value).subscribe({
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

    editar(data: OrganizacaoVeiculo){
        this.form.patchValue(data);
    }
}