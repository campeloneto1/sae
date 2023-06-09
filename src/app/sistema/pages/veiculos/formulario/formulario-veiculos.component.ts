import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Cores } from "../../cores/cores";
import { CoresService } from "../../cores/cores.service";
import { Marcas } from "../../marcas/marcas";
import { MarcasService } from "../../marcas/marcas.service";
import { Modelos } from "../../modelos/modelos";
import { ModelosService } from "../../modelos/modelos.service";
import { Organizacoes } from "../../organizacoes/organizacoes";
import { OrganizacoesService } from "../../organizacoes/organizacoes.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { VeiculosTiposService } from "../../veiculos-tipos/veiculos-tipos.service";
import { Veiculo } from "../veiculos";
import { VeiculosService } from "../veiculos.service";


@Component({
    selector: 'formulario-veiculos',
    templateUrl: './formulario-veiculos.component.html',
    styleUrls: ['./formulario-veiculos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioVeiculosComponent{

    protected form!: FormGroup;


    protected tipos$!: Observable<any>;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected cores$!: Observable<Cores>;
    protected pessoas$!: Observable<Pessoas>;
    protected organizacoes$!: Observable<Organizacoes>;

    protected subscription: any;
    protected subscription2: any;
   
    @Output('refresh') refresh: EventEmitter<Veiculo> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<Veiculo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private coresService: CoresService,
        private marcasService: MarcasService,
        private veiculosService: VeiculosService,
        private veiculosTiposService: VeiculosTiposService,
        private pessoasService: PessoasService,
        private organizacoesService: OrganizacoesService
    ){}
   
    ngOnInit(): void {
        //this.editor = new Editor();

        this.form = this.formBuilder.group({
            'id': [''],
            'placa': ['', Validators.compose([
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(7)
            ])],
            'renavam': ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],
            'chassi': ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],
            'cor_id': [''],
            'ano': ['', Validators.compose([
                Validators.min(1990),
                Validators.max(2050)
            ])],
            'marca_id': ['', Validators.compose([
                Validators.required,
            ])],
            'modelo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'veiculo_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'pessoa_id': [''],
            'organizacao_id': [''],
            'observacao': [''],
            'key': [''],
           
        });

        this.tipos$ = this.veiculosTiposService.index();
        this.cores$ = this.coresService.index();
        this.marcas$ = this.marcasService.index();      
        this.organizacoes$ = this.organizacoesService.index();        

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
        //this.editor.destroy();
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }  
    
    getModelos(){
        this.modelos$ = this.marcasService.where(this.form.value.marca_id);
    }
   
    cadastrar(){
        if(this.form.valid){
            if(this.form.value.id){
                this.subscription = this.veiculosService.update(this.form.value).subscribe({
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
                this.subscription = this.veiculosService.store(this.form.value).subscribe({
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

    cancelCad(){
        this.form.reset();
        this.cancel.emit();
    }

    editar(data: Veiculo){
        this.form.patchValue(data);
        this.form.get('marca_id')?.patchValue(data.modelo?.marca_id);
        this.getModelos();
        
    }
}