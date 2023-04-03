import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SharedModule } from "../../shared/shared.module";
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

    protected resultado!: any;
    protected subscription!: any;

    constructor(private formBuilder: FormBuilder,
        private pesquisarService: PesquisarService){

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'pesquisar': ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150)
            ])],
            'analises': [1],
            'pessoas': [1],
            'veiculos': [1],
            'organizacoes': [1]
        })
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