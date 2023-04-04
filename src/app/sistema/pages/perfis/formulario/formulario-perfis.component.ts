import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Perfil } from "../perfis";
import { PerfisService } from "../perfis.service";

@Component({
    selector: 'formulario-perfis',
    templateUrl: './formulario-perfis.component.html',
    styleUrls: ['./formulario-perfis.component.css'],
    standalone: true,
    imports: [
        CommonModule, 
        SharedModule
    ]
})

export class FormularioPerfisComponent implements OnInit{

    protected form!: FormGroup;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Perfil> = new EventEmitter();

    constructor( private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private perfisService: PerfisService,){}

        ngOnInit(): void {
            this.form = this.formBuilder.group({
                'id': [''],
                'nome': ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(150)
                ])], 
                'administrador': [0],
                'gestor': [0],
                'restrito': [0],           
                'relatorios': [0],

                'users': [0],
                'users_cad': [0],
                'users_edt': [0],
                'users_del': [0],

                'analises': [0],
                'analises_cad': [0],
                'analises_edt': [0],
                'analises_del': [0],

                'organizacoes': [0],
                'organizacoes_cad': [0],
                'organizacoes_edt': [0],
                'organizacoes_del': [0],

                'pessoas': [0],
                'pessoas_cad': [0],
                'pessoas_edt': [0],
                'pessoas_del': [0],

                'veiculos': [0],
                'veiculos_cad': [0],
                'veiculos_edt': [0],
                'veiculos_del': [0],

            });
        
        }
    
        ngOnDestroy(): void {
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            
        }
    
        cadastrar(){
            if(this.form.value.id){
                this.subscription = this.perfisService.update(this.form.value).subscribe({
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
                this.subscription = this.perfisService.store(this.form.value).subscribe({
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
    
        editar(data: Perfil){
            this.form.patchValue(data);
        }

}