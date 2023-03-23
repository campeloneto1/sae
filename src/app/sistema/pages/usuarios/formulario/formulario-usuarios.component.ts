import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, tap } from "rxjs";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { Perfis } from "../../perfis/perfis";
import { PerfisService } from "../../perfis/perfis.service";
import { Usuario } from "../usuarios";
import { UsuariosService } from "../usuarios.service";


@Component({
    selector: 'formulario-usuarios',
    templateUrl: './formulario-usuarios.component.html',
    styleUrls: ['./formulario-usuarios.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class FormularioUsuariosComponent implements OnInit, OnDestroy{

    protected form!: FormGroup;

    protected perfis$!: Observable<Perfis>;

    protected subscription: any;
   
    @Output('refresh') refresh: EventEmitter<Usuario> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private usuariosService: UsuariosService,
        private perfisService: PerfisService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [''],
            'nome': ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(150)
            ])],
            'cpf': ['', Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': ['', Validators.compose([
                Validators.email,
            ])],
            'telefone': ['', Validators.compose([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(11)
            ])],
           
            'perfil_id': ['', Validators.compose([
                Validators.required,
            ])],
        });

        this.perfis$ = this.perfisService.index();
        /*this.subscription = this.perfisService.index().subscribe({
            next: (data) => {
                this.perfis$ = data;
                this.perfis$.forEach((element:any) => {
                    element.text = element.nome+" "+element.id
                });
                console.log(this.perfis$)
            },
            error: (data) => {

            }
        })*/

       
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        
    }

    cadastrar(){
        if(this.form.value.id){
            this.subscription = this.usuariosService.update(this.form.value).subscribe({
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
            this.subscription = this.usuariosService.store(this.form.value).subscribe({
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

    editar(data: Usuario){
        this.form.patchValue(data);
    }
}