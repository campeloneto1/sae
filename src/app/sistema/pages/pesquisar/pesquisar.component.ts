import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SessionService } from "../../shared/session.service";
import { SharedModule } from "../../shared/shared.module";
import { Usuario } from "../usuarios/usuarios";
import { PesquisarService } from "./pesquisar.service";

@Component({
    selector: 'pesquisar',
    templateUrl: './pesquisar.component.html',
    styleUrls: ['./pesquisar.component.css'],
    standalone: true,
    imports: [CommonModule, TituloComponent, SharedModule, RouterModule]
})

export class PesquisarComponent implements OnInit, OnDestroy{
    protected form!: FormGroup;
    protected user!: Usuario;
    protected resultado!: any;
    protected subscription!: any;

    constructor(private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private pesquisarService: PesquisarService){

    }

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
        this.form = this.formBuilder.group({
            'pesquisar': ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150)
            ])],
            'analises': [0],
            'organizacoes': [0],
            'pessoas': [0],
            'veiculos': [0],
            'investigacoes_sociais': [0],
        });

        if(this.user.perfil.analises){
            this.form.get('analises')?.patchValue(1);
        }
        if(this.user.perfil.investigacoes_sociais){
            this.form.get('investigacoes_sociais')?.patchValue(1);
        }
        if(this.user.perfil.organizacoes){
            this.form.get('organizacoes')?.patchValue(1);
        }
        if(this.user.perfil.pessoas){
            this.form.get('pessoas')?.patchValue(1);
        }
        if(this.user.perfil.veiculos){
            this.form.get('veiculos')?.patchValue(1);
        }
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    pesquisar(){
        //console.log(this.form.value)
       this.pesquisarService.pesquisar(this.form.value).subscribe({
        next: (data) => {
            this.resultado = data; 
        }
       })
    }
}