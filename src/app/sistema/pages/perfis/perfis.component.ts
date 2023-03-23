import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TituloComponent } from "../../components/titulo/titulo.component";


@Component({
    selector: 'app-perfis',
    templateUrl: './perfis.component.html',
    styleUrls: ['./perfis.component.css'],
    standalone: true,
    imports: [CommonModule, TituloComponent]
})

export class PerfisComponent{
    

    constructor(){

    }

    ngOnInit(): void {
    }

}