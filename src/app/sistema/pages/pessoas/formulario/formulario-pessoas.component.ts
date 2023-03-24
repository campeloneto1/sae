import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Sexos } from "../../sexos/sexos";
import { SexosService } from "../../sexos/sexos.service";
import { Influencias } from "../../influencias/influencias";
import { InfluenciasService } from "../../influencias/influencias.service";
import { Pessoa } from "../pessoas";
import { PessoasService } from "../pessoas.service";
import { Paises } from "../../paises/paises";
import { Estados } from "../../estados/estados";
import { Cidades } from "../../cidades/cidades";

@Component({
    selector: 'formulario-pessoas',
    templateUrl: './formulario-pessoas.component.html',
    styleUrls: ['./formulario-pessoas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasComponent{

    protected form!: FormGroup;

    protected erroCpf: boolean = false;

    protected sexos$!: Observable<Sexos>;
    protected influencias$!: Observable<Influencias>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Pessoa> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<Pessoa> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private sexosService: SexosService,
        private influenciasService: InfluenciasService,
        private pessoasService: PessoasService
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
            'alcunha': ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],
            'cpf': ['', Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'data_nascimento': [''],
            'mae': ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],
            'pai': ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(150)
            ])],
            'sexo_id': [''],
            'influencia_id': [''],
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
            'foto': [''],
        });

        this.sexos$ = this.sexosService.index();
        this.influencias$ = this.influenciasService.index();
        this.paises$ = this.sharedService.getPaises();        
    }

    ngOnDestroy(): void {
        //this.editor.destroy();
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    checkCpf(){
        if(this.form.value.cpf){
            this.pessoasService.checkCpf(this.form.value.cpf).subscribe({
                next: (data) => {
                    if(data){
                        this.erroCpf = true;
                        //this.sharedService.toast('Error!', "O CPF já existe", 2);
                    }else{
                        this.erroCpf = false;
                    }
                },
                error: (error) => {
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            })
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
                this.subscription = this.pessoasService.update(this.form.value).subscribe({
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
                this.subscription = this.pessoasService.store(this.form.value).subscribe({
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

    editar(data: Pessoa){
        this.form.patchValue(data);
        this.form.get('estado_id')?.patchValue(data.cidade?.estado_id);
        this.form.get('pais_id')?.patchValue(data.cidade?.estado?.pais_id);
        this.getEstados();
        this.getCidades();
    }
}