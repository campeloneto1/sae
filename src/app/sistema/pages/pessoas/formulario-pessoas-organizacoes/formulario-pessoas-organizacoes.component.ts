import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Organizacoes } from "../../organizacoes/organizacoes";
import { OrganizacoesService } from "../../organizacoes/organizacoes.service";
import { OrganizacaoPessoa } from "../../organizacoes/formulario-organizacoes-pessoas/organizacoes-pessoas";
import { OrganizacoesPessoasService } from "../../organizacoes/formulario-organizacoes-pessoas/organizacoes-pessoas.service";

@Component({
    selector: 'formulario-pessoas-organizacoes',
    templateUrl: './formulario-pessoas-organizacoes.component.html',
    styleUrls: ['./formulario-pessoas-organizacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasOrganizacoesComponent{

    protected form!: FormGroup;

    protected organizacoes$!: Observable<Organizacoes>;

    protected subscription: any;
    protected subscription2: any;

    @Input() pessoa_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<OrganizacaoPessoa> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private organizacoesService: OrganizacoesService,
        private organizacoesPessoasService: OrganizacoesPessoasService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': [''],
            'organizacao_id': ['', Validators.compose([
                Validators.required,
            ])],
            'lider': [''],
        });
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        this.organizacoes$ = this.organizacoesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);

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