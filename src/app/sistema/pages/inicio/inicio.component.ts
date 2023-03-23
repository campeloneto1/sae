import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TituloComponent } from "../../components/titulo/titulo.component";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: true,
    imports: [CommonModule, TituloComponent]
})

export class InicioComponent{
    
}