import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Organizacoes } from "../../organizacoes/organizacoes";
import { OrganizacoesService } from "../../organizacoes/organizacoes.service";
import { OrganizacaoVeiculo } from "../../organizacoes/formulario-organizacoes-veiculos/organizacoes-veiculos";
import { OrganizacoesVeiculosService } from "../../organizacoes/formulario-organizacoes-veiculos/organizacoes-veiculos.service";


@Component({
    selector: 'formulario-veiculos-organizacoes',
    templateUrl: './formulario-veiculos-organizacoes.component.html',
    styleUrls: ['./formulario-veiculos-organizacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioVeiculosOrganizacoesComponent{

    protected form!: FormGroup;

    protected organizacoes$!: Observable<Organizacoes>;

    protected subscription: any;
    protected subscription2: any;

    @Input() veiculo_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<OrganizacaoVeiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private organizacoesService: OrganizacoesService,
        private organizacoesVeiculosService: OrganizacoesVeiculosService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'veiculo_id': [''],
            'organizacao_id': ['', Validators.compose([
                Validators.required,
            ])],
            'lider': [''],
        });
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);
        this.organizacoes$ = this.organizacoesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('veiculo_id')?.patchValue(this.veiculo_id);

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