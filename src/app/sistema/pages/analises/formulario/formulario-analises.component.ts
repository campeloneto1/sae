import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Analise } from "../analises";
import { AnalisesService } from "../analises.service";
import { Paises } from "../../paises/paises";
import { Estados } from "../../estados/estados";
import { Cidades } from "../../cidades/cidades";
import { AnalisesTipos } from "../../analises-tipos/analises-tipos";
import { AnalisesTiposService } from "../../analises-tipos/analises-tipos.service";
import { AnaliseCategoria, AnalisesCategorias } from "../../analises-categorias/analises-categorias";
import { AnalisesCategoriasService } from "../../analises-categorias/analises-categorias.service";

@Component({
    selector: 'formulario-analises',
    templateUrl: './formulario-analises.component.html',
    styleUrls: ['./formulario-analises.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioAnalisesComponent{

    protected form!: FormGroup;

    protected analisescategorias$!: Observable<AnalisesCategorias>;
    protected analisecategoria!: AnaliseCategoria;
    protected analisestipos$!: Observable<AnalisesTipos>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;

    protected subscription: any;
    protected subscription2: any;
   
    @Output('refresh') refresh: EventEmitter<Analise> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<Analise> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private analisesTiposService: AnalisesTiposService,
        private analisesCategoriasService: AnalisesCategoriasService,
        private analisesService: AnalisesService
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
            'analise_categoria_id': ['', Validators.compose([
                Validators.required
            ])],
            'analise_tipo_id': [''],
            'data': ['', Validators.compose([
                Validators.required
            ])],
            'hora': ['', Validators.compose([
                Validators.required
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
            'previa': [''],
            'sintese': [''],
            'key': [''],
        });

        this.paises$ = this.sharedService.getPaises();     
        this.analisescategorias$ = this.analisesCategoriasService.index();        
        this.analisestipos$ = this.analisesTiposService.index();        
    }

    ngOnDestroy(): void {
        //this.editor.destroy();
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    getCategoria(){
        if(this.form.value.analise_categoria_id){
            /*this.subscription2 = this.analisesCategoriasService.show(this.form.value.analise_categoria_id).subscribe({
                next: (data) => {
                    this.analisecategoria = data;
                },
                error: (error) =>{
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            });*/

            this.analisescategorias$.subscribe({
                next: (data) => {
                   data.forEach((data) => {
                    if(data.id == this.form.value.analise_categoria_id){
                        this.analisecategoria = data;
                    }
                   });
                },
                error: (error) =>{
                    this.sharedService.toast('Error!', error.erro as string, 2);
                }
            })
        }else{
            this.analisecategoria = {} as AnaliseCategoria;
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
                this.subscription = this.analisesService.update(this.form.value).subscribe({
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
                this.subscription = this.analisesService.store(this.form.value).subscribe({
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

    editar(data: Analise){
        this.form.patchValue(data);
        this.form.get('estado_id')?.patchValue(data.cidade?.estado_id);
        this.form.get('pais_id')?.patchValue(data.cidade?.estado?.pais_id);
        this.getEstados();
        this.getCidades();
        this.getCategoria();
    }
}