import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { InvestigacaoSocialStatus, InvestigacoesSociaisStatus } from "../investigacoes-sociais-status";
import { InvestigacoesSociaisStatusService } from "../investigacoes-sociais-status.service";

@Component({
    selector: 'formulario-investigacoes-sociais-status',
    templateUrl: './formulario-investigacoes-sociais-status.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-status.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisStatusComponent{
    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocialStatus> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private investigacoesSociaisStatusService: InvestigacoesSociaisStatusService,
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(150)
            ])],  
            'andamento': [0],
            'concluido': [0],
            'encaminhado': [0],
            'aprovado': [0],     
            'recusado': [0],
            'aguardando': [0],
            'transferido': [0],
        });
    
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.investigacoesSociaisStatusService.update(this.form.value).subscribe({
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
            this.subscription = this.investigacoesSociaisStatusService.store(this.form.value).subscribe({
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

    editar(data: InvestigacaoSocialStatus){
        this.form.patchValue(data);
    }
}