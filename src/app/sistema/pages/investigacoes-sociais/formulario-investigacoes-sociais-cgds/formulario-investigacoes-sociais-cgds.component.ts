import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { CgdsEnvolvimentosTipos } from "../../cgds-envolvimentos-tipos/cgds-envolvimentos-tipos";
import { CgdsEnvolvimentosTiposService } from "../../cgds-envolvimentos-tipos/cgds-envolvimentos-tipos.service";
import { CgdsProcessosTipos } from "../../cgds-processos-tipos/cgds-processos-tipos";
import { CgdsProcessosTiposService } from "../../cgds-processos-tipos/cgds-processos-tipos.service";
import { CgdsSituacoesTipos } from "../../cgds-situacoes-tipos/cgds-situacoes-tipos";
import { CgdsSituacoesTiposService } from "../../cgds-situacoes-tipos/cgds-situacoes-tipos.service";
import { InvestigacaoSocialCgd } from "./investigacoes-sociais-cgds";
import { InvestigacoesSociaisCgdsService } from "./investigacoes-sociais-cgds.service";

@Component({
    selector: 'formulario-investigacoes-sociais-cgds',
    templateUrl: './formulario-investigacoes-sociais-cgds.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-cgds.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisCgdsComponent{

    protected form!: FormGroup;    

    protected subscription: any;

    protected cgdsenvolvimentostipos$!: Observable<CgdsEnvolvimentosTipos>;
    protected cgdsprocessostipos$!: Observable<CgdsProcessosTipos>;
    protected cgdssituacoestipos$!: Observable<CgdsSituacoesTipos>;

    @Input() investigacao_social_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocialCgd> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private cgdsEnvolvimentosTiposService: CgdsEnvolvimentosTiposService,
        private cgdsProcessosTiposService: CgdsProcessosTiposService,
        private cgdsSituacoesTiposService: CgdsSituacoesTiposService,
        private investigacoesSociaisCgdsService: InvestigacoesSociaisCgdsService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],
            'spu': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'cgd_envolvimento_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'cgd_processo_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'cgd_situacao_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'descricao': ['', Validators.compose([
                Validators.required,
            ])],
            'investigacao_social_id': [''],
            
        });
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        this.cgdsenvolvimentostipos$ = this.cgdsEnvolvimentosTiposService.index();
        this.cgdsprocessostipos$ = this.cgdsProcessosTiposService.index();
        this.cgdssituacoestipos$ = this.cgdsSituacoesTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }    

    cadastrar(){
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        if(this.form.value.investigacao_social_id){
            if(this.form.value.id){
                this.subscription = this.investigacoesSociaisCgdsService.update(this.form.value).subscribe({
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
                this.subscription = this.investigacoesSociaisCgdsService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocialCgd){
        this.form.patchValue(data);
    }
}