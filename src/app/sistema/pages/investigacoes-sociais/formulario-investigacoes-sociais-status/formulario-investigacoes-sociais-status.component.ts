import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { InvestigacaoSocialStatus, InvestigacoesSociaisStatus } from "../../investigacoes-sociais-status/investigacoes-sociais-status";
import { InvestigacoesSociaisStatusService } from "../../investigacoes-sociais-status/investigacoes-sociais-status.service";
import { Usuarios } from "../../usuarios/usuarios";
import { UsuariosService } from "../../usuarios/usuarios.service";
import { InvestigacaoSocial } from "../investigacoes-sociais";
import { InvestigacoesSociaisService } from "../investigacoes-sociais.service";

@Component({
    selector: 'formulario-investigacoes-sociais-status',
    templateUrl: './formulario-investigacoes-sociais-status.component.html',
    styleUrls: ['./formulario-investigacoes-sociais-status.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioInvestigacoesSociaisStatusComponent{

    protected form!: FormGroup;    
    protected selectedstatus!: InvestigacaoSocialStatus;

    protected subscription: any;
    protected subscription2: any;

    protected investigacoessociaisstatus$!: Observable<InvestigacoesSociaisStatus>;
    protected usuarios$!: Observable<Usuarios>;

    @Input() investigacao_social_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<InvestigacaoSocial> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private investigacoesSociaisService: InvestigacoesSociaisService,
        private usuariosService: UsuariosService,
        private investigacoesSociaisStatusService: InvestigacoesSociaisStatusService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],
            'investigacao_social_id': [''],
            'investigacao_social_status_id': ['', Validators.compose([
                Validators.required,
            ])],
            'bcg_transferencia': [''],
            'encaminhou_id': [''],
        });
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        this.investigacoessociaisstatus$ = this.investigacoesSociaisStatusService.index();
        this.usuarios$ = this.usuariosService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    getStatus(){
        this.subscription2 = this.investigacoessociaisstatus$.subscribe({
            next: (data) => {
                data.forEach(data => {
                    if(data.id == this.form.value.investigacao_social_status_id){
                        this.selectedstatus = data;
                    }
                });
            }
        })
    }

    cadastrar(){
        this.form.get('investigacao_social_id')?.patchValue(this.investigacao_social_id);
        if(this.form.value.investigacao_social_id){
            this.subscription = this.investigacoesSociaisService.change_status(this.form.value).subscribe({
                next: (data) => {
                    this.sharedService.toast("Sucesso", data as string, 1);
                    this.form.reset();
                    this.refresh.emit();
                    this.selectedstatus = {} as InvestigacaoSocialStatus;
                },
                error: (error) =>{
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });
        }
    }

    editar(data: InvestigacaoSocial){
        this.form.patchValue(data);
    }
}