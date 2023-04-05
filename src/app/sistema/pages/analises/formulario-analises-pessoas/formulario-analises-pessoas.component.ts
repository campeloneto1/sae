import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { AnalisePessoa } from "./analises-pessoas";
import { AnalisesPessoasService } from "./analises-pessoas.service";


@Component({
    selector: 'formulario-analises-pessoas',
    templateUrl: './formulario-analises-pessoas.component.html',
    styleUrls: ['./formulario-analises-pessoas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioAnalisesPessoasComponent{

    protected form!: FormGroup;

    protected pessoas$!: Observable<Pessoas>;

    protected subscription: any;
    protected subscription2: any;

    @Input() analise_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<AnalisePessoa> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private pessoasService: PessoasService,
        private analisesPessoasService: AnalisesPessoasService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': ['', Validators.compose([
                Validators.required,
            ])],
            'analise_id': [''],
            'lider': [''],
        });
        this.form.get('analise_id')?.patchValue(this.analise_id);
        
        this.subscription2 = this.pessoasService.index().subscribe({
            next: (data) => {
                data.forEach((pessoa) => {
                    pessoa.nome = `${pessoa.nome} (${pessoa.cpf})`;
                });
                this.pessoas$ = of(data);
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });

    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('analise_id')?.patchValue(this.analise_id);

        if(this.form.value.pessoa_id && this.form.value.analise_id){
            if(this.form.value.id){
                this.subscription = this.analisesPessoasService.update(this.form.value).subscribe({
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
                this.subscription = this.analisesPessoasService.store(this.form.value).subscribe({
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

    editar(data: AnalisePessoa){
        this.form.patchValue(data);
    }
}