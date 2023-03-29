import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Analises } from "../../analises/analises";
import { AnalisesService } from "../../analises/analises.service";
import { AnalisePessoa } from "../../analises/formulario-analises-pessoas/analises-pessoas";
import { AnalisesPessoasService } from "../../analises/formulario-analises-pessoas/analises-pessoas.service";

@Component({
    selector: 'formulario-pessoas-analises',
    templateUrl: './formulario-pessoas-analises.component.html',
    styleUrls: ['./formulario-pessoas-analises.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioPessoasAnalisesComponent{

    protected form!: FormGroup;

    protected analises$!: Observable<Analises>;

    protected subscription: any;
    protected subscription2: any;

    @Input() pessoa_id?: number = 0;
   
    @Output('refresh') refresh: EventEmitter<AnalisePessoa> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private analisesService: AnalisesService,
        private analisesPessoasService: AnalisesPessoasService
    ){}
   
    ngOnInit(): void {
        
        this.form = this.formBuilder.group({
            'id': [''],           
            'pessoa_id': [''],
            'analise_id': ['', Validators.compose([
                Validators.required,
            ])],
            'lider': [''],
        });
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);
        this.analises$ = this.analisesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
       
    }

    cadastrar(){
        this.form.get('pessoa_id')?.patchValue(this.pessoa_id);

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