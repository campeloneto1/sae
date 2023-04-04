import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { SessionService } from "../../shared/session.service";
import { Usuario } from "../usuarios/usuarios";
import { InicioService } from "./inicio.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: true,
    imports: [CommonModule, TituloComponent]
})

export class InicioComponent implements OnInit, OnDestroy{

    protected quantanalises!: any;

    protected user!: Usuario;

    protected subscription: any;

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
       })
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
    
}