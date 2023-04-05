import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Batalhoes } from "../../batalhoes/batalhoes";
import { BatalhoesService } from "../../batalhoes/batalhoes.service";
import { Companhias } from "../../companhias/companhias";
import { CompanhiasService } from "../../companhias/companhias.service";
import { Comportamentos } from "../../comportamentos/comportamentos";
import { ComportamentosService } from "../../comportamentos/comportamentos.service";
import { Graduacoes } from "../../graduacoes/graduacoes";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { SituacoesFuncionais } from "../../situacoes-funcionais/situacoes-funcionais";
import { SituacoesFuncionaisService } from "../../situacoes-funcionais/situacoes-funcionais.service";
import { SituacoesTipos } from "../../situacoes-tipos/situacoes-tipos";
import { SituacoesTiposService } from "../../situacoes-tipos/situacoes-tipos.service";
import { InvestigacaoSocial } from "../investigacoes-sociais";
import { InvestigacoesSociaisService } from "../investigacoes-sociais.service";

@Component({
    selector: 'formulario-investigacoes-sociais',
    templateUrl: './formulario-investigacoes-sociais.component.html',
    styleUrls: ['./formulario-investigacoes-sociais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisComponent{
    protected form!: FormGroup;

    protected pessoas$!: Observable<Pessoas>;
    protected graduacoes$!: Observable<Graduacoes>;
    protected batalhoes$!: Observable<Batalhoes>;
    protected companhias$!: Observable<Companhias>;
    protected situacoesfuncionais$!: Observable<SituacoesFuncionais>;
    protected situacoestipos$!: Observable<SituacoesTipos>;
    protected comportamentos$!: Observable<Comportamentos>;

    protected subscription: any;
    protected subscription2: any;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocial> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private pessoasService: PessoasService,
        private graduacoesService: GraduacoesService,
        private companhiasService: CompanhiasService,
        private batalhoesService: BatalhoesService,
        private situacoesFuncionaisService: SituacoesFuncionaisService,
        private situacoesTiposService: SituacoesTiposService,
        private comportamentosService: ComportamentosService,
        private investigacoesSociaisService: InvestigacoesSociaisService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'pessoa_id': ['', Validators.compose([
                Validators.required,               
            ])], 
            'matricula': ['', Validators.compose([
                Validators.minLength(8),    
                Validators.maxLength(8),               
            ])], 
            'numeral': ['', Validators.compose([
                Validators.minLength(1),  
                Validators.maxLength(5),                   
            ])],           
            'data_ingresso': [''],
            'graduacao_id': [''],
            'batalhao_id': [''],
            'companhia_id': [''],
            'situacao_funcional_id': [''],            
            'situacao_tipo_id': [''],
            'comportamento_id': [''],

            'sip': [''],
            'sinesp': [''],
            'tjce': [''],
            'fontes_abertas': [''],
            'informacoes_adicionais': [''],
        });
    

        this.graduacoes$ = this.graduacoesService.index();
        //this.companhias$ = this.companhiasService.index();
        this.batalhoes$ = this.batalhoesService.index();
        this.situacoesfuncionais$ = this.situacoesFuncionaisService.index();
        this.situacoestipos$ = this.situacoesTiposService.index();
        this.comportamentos$ = this.comportamentosService.index();

        this.subscription2 = this.pessoasService.index().subscribe({
            next: (data) => {
                data.forEach((pessoa) => {
                    pessoa.nome = `${pessoa.nome} (${pessoa.cpf})`;
                });
                this.pessoas$ = of(data);
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

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        
    }

    getCompanhias(){
        this.companhias$ = this.batalhoesService.companhias(this.form.value.batalhao_id);
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.investigacoesSociaisService.update(this.form.value).subscribe({
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
            this.subscription = this.investigacoesSociaisService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocial){
        this.form.patchValue(data);
        this.form.get('batalhao_id')?.patchValue(data.companhia?.batalhao_id);
        this.companhias$ = this.batalhoesService.companhias(data.companhia?.batalhao_id || 0);
    }
}