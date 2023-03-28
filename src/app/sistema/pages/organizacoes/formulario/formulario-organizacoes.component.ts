import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Organizacao } from "../organizacoes";
import { OrganizacoesService } from "../organizacoes.service";
import { Paises } from "../../paises/paises";
import { Estados } from "../../estados/estados";
import { Cidades } from "../../cidades/cidades";
import { OrganizacoesTipos } from "../../organizacoes-tipos/organizacoes-tipos";
import { OrganizacoesTiposService } from "../../organizacoes-tipos/organizacoes-tipos.service";

@Component({
    selector: 'formulario-organizacoes',
    templateUrl: './formulario-organizacoes.component.html',
    styleUrls: ['./formulario-organizacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioOrganizacoesComponent{

    protected form!: FormGroup;

    protected organizacoestipos$!: Observable<OrganizacoesTipos>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Organizacao> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<Organizacao> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private organizacoesTiposService: OrganizacoesTiposService,
        private organizacoesService: OrganizacoesService
    ){}
   
    ngOnInit(): void {
        //this.editor = new Editor();

        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'organizacao_tipo_id': ['', Validators.compose([
                Validators.required
            ])],
            'telefone1': ['', Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'telefone2': ['', Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': ['', Validators.compose([
                Validators.email,
            ])],
            'cep': ['', Validators.compose([
                Validators.minLength(7),
                Validators.maxLength(7)
            ])],
            'pais_id': [''],
            'estado_id': [''],
            'cidade_id': [''],
            'rua': ['', Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(150)
            ])],
            'numero': ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(20)
            ])],
            'bairro': ['', Validators.compose([
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'complemento': ['', Validators.compose([
                Validators.minLength(4),
                Validators.maxLength(150)
            ])],
            'observacao': [''],
            'key': [''],
        });

        this.paises$ = this.sharedService.getPaises();     
        this.organizacoestipos$ = this.organizacoesTiposService.index();        
    }

    ngOnDestroy(): void {
        //this.editor.destroy();
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    getEstados(){
        if(this.form.value.pais_id){
            this.estados$ = this.sharedService.getEstados(this.form.value.pais_id);
        }else{
            this.form.get('estado_id')?.patchValue('');
            this.form.get('cidade_id')?.patchValue('');
        }
    }

    getCidades(){
        if(this.form.value.estado_id){
            this.cidades$ = this.sharedService.getCidades(this.form.value.estado_id);
        }else{
            this.form.get('cidade_id')?.patchValue('');
        }
    }

    cadastrar(){
        if(this.form.valid){
            if(this.form.value.id){
                this.subscription = this.organizacoesService.update(this.form.value).subscribe({
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
                this.subscription = this.organizacoesService.store(this.form.value).subscribe({
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

    editar(data: Organizacao){
        this.form.patchValue(data);
        this.form.get('estado_id')?.patchValue(data.cidade?.estado_id);
        this.form.get('pais_id')?.patchValue(data.cidade?.estado?.pais_id);
        this.getEstados();
        this.getCidades();
    }
}