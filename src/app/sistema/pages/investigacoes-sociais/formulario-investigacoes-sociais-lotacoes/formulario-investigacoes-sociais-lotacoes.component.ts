import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Batalhoes } from "../../batalhoes/batalhoes";
import { BatalhoesService } from "../../batalhoes/batalhoes.service";
import { Companhias } from "../../companhias/companhias";
import { LotacoesTipos } from "../../lotacoes-tipos/lotacoes-tipos";
import { LotacoesTiposService } from "../../lotacoes-tipos/lotacoes-tipos.service";
import { InvestigacaoSocialLotacao } from "./investigacoes-sociais-lotacoes";
import { InvestigacoesSociaisLotacoesService } from "./investigacoes-sociais-lotacoes.service";

@Component({
    selector: 'formulario-investigacoes-sociais-lotacoes',
    templateUrl: './formulario-investigacoes-sociais-lotacoes.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-lotacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisLotacoesComponent{

    protected form!: FormGroup;    

    protected subscription: any;

    protected batalhoes$!: Observable<Batalhoes>;
    protected companhias$!: Observable<Companhias>;
    protected lotacoestipos$!: Observable<LotacoesTipos>;

    @Input() investigacao_social_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocialLotacao> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private batalhoesService: BatalhoesService,
        private lotacoesTiposService: LotacoesTiposService,
        private investigacoesSociaisLotacoesService: InvestigacoesSociaisLotacoesService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],
            'bcg': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'lotacao_tipo_id': ['', Validators.compose([
                Validators.required,
            ])],
            'data': ['', Validators.compose([
                Validators.required,
                
            ])],
            'batalhao_id': ['', Validators.compose([
                Validators.required,
            ])],
            'companhia_id': ['', Validators.compose([
                Validators.required,
            ])],
            'investigacao_social_id': [''],
            
        });
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        this.batalhoes$ = this.batalhoesService.index();
        this.lotacoestipos$ = this.lotacoesTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    getCompanhias(){
        this.companhias$ = this.batalhoesService.companhias(this.form.value.batalhao_id);
    }

    cadastrar(){
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        if(this.form.value.investigacao_social_id){
            if(this.form.value.id){
                this.subscription = this.investigacoesSociaisLotacoesService.update(this.form.value).subscribe({
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
                this.subscription = this.investigacoesSociaisLotacoesService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocialLotacao){
        this.form.patchValue(data);
    }
}