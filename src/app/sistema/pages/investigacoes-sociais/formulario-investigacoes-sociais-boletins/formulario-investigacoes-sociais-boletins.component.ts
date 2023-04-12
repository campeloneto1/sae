import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { InvestigacaoSocialBoletim } from "./investigacoes-sociais-boletins";
import { InvestigacoesSociaisBoletinsService } from "./investigacoes-sociais-boletins.service";

@Component({
    selector: 'formulario-investigacoes-sociais-boletins',
    templateUrl: './formulario-investigacoes-sociais-boletins.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-boletins.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisBoletinsComponent{

    protected form!: FormGroup;    

    protected subscription: any;

    @Input() investigacao_social_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocialBoletim> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private investigacoesSociaisBoletinsService: InvestigacoesSociaisBoletinsService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],
            'bcg': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'descricao': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(250)
            ])],
            'investigacao_social_id': [''],
            
        });
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
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
                this.subscription = this.investigacoesSociaisBoletinsService.update(this.form.value).subscribe({
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
                this.subscription = this.investigacoesSociaisBoletinsService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocialBoletim){
        this.form.patchValue(data);
    }
}