import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { RedesSociais } from "../../redes-sociais/redes-sociais";
import { RedesSociaisService } from "../../redes-sociais/redes-sociais.service";
import { PessoaRedeSocial } from "./pessoas-redes-sociais";
import { PessoasRedesSociaisService } from "./pessoas-redes-sociais.service";

@Component({
    selector: 'formulario-pessoas-redes-sociais',
    templateUrl: './formulario-pessoas-redes-sociais.component.html',
    styleUrls: ['./formulario-pessoas-redes-sociais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasRedesSociaisComponent{

    protected form!: FormGroup;

    protected redessociais$!: Observable<RedesSociais>;

    protected subscription: any;

    @Input() pessoa_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<PessoaRedeSocial> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private redesSociaisService: RedesSociaisService,
        private pessoasRedesSociaisService: PessoasRedesSociaisService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'pessoa_id': [''],
            'rede_social_id': ['', Validators.compose([
                Validators.required,
            ])],
        });
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        this.redessociais$ = this.redesSociaisService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        if(this.form.value.pessoa_id && this.form.value.rede_social_id){
            if(this.form.value.id){
                this.subscription = this.pessoasRedesSociaisService.update(this.form.value).subscribe({
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
                this.subscription = this.pessoasRedesSociaisService.store(this.form.value).subscribe({
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

    editar(data: PessoaRedeSocial){
        this.form.patchValue(data);
    }
}