import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SessionService } from "../../shared/session.service";
import { SharedModule } from "../../shared/shared.module";
import { Usuario } from "../usuarios/usuarios";
import { InicioService } from "./inicio.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: true,
    imports: [CommonModule, TituloComponent, RouterModule, SharedModule]
})

export class InicioComponent implements OnInit, OnDestroy{

    protected quantanalises!: any;
    protected quantinvestigacoes!: any;
    protected ultimasinvestigacoes!: any;

    protected user!: Usuario;

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

    constructor(private inicioService: InicioService,
         
        private sessionService: SessionService){}

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();
        this.subscription = this.inicioService.quant_analises().subscribe({
            next: (data) => {
                this.quantanalises = data;
            },
            error: (erro) => {

            }
        });
        this.subscription2 = this.inicioService.quant_investigacoes().subscribe({
            next: (data) => {
                this.quantinvestigacoes = data;
            },
            error: (erro) => {

            }
        });
        this.subscription3 = this.inicioService.ultimas_investigacoes().subscribe({
            next: (data) => {
                this.ultimasinvestigacoes = data;
            },
            error: (erro) => {

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
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
    }
    
}