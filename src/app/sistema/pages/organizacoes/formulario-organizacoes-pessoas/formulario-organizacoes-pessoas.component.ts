import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { OrganizacaoPessoa } from "./organizacoes-pessoas";
import { OrganizacoesPessoasService } from "./organizacoes-pessoas.service";


@Component({
    selector: 'formulario-organizacoes-pessoas',
    templateUrl: './formulario-organizacoes-pessoas.component.html',
    styleUrls: ['./formulario-organizacoes-pessoas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioOrganizacoesPessoasComponent{

    protected form!: FormGroup;

    protected pessoas$!: Observable<Pessoas>;

    protected subscription: any;
    protected subscription2: any;

    @Input() organizacao_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<OrganizacaoPessoa> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private pessoasService: PessoasService,
        private organizacoesPessoasService: OrganizacoesPessoasService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': ['', Validators.compose([
                Validators.required,
            ])],
            'organizacao_id': [''],
            'lider': [''],
        });
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);
        this.pessoas$ = this.pessoasService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('organizacao_id')?.patchValue(this.organizacao_id);

        if(this.form.value.pessoa_id && this.form.value.organizacao_id){
            if(this.form.value.id){
                this.subscription = this.organizacoesPessoasService.update(this.form.value).subscribe({
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
                this.subscription = this.organizacoesPessoasService.store(this.form.value).subscribe({
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

    editar(data: OrganizacaoPessoa){
        this.form.patchValue(data);
    }
}