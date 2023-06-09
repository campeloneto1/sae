import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-titulo',
    templateUrl: './titulo.component.html',
    styleUrls: ['./titulo.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})

export class TituloComponent{
    @Input() titulo: string = '';
    @Input() primario: boolean = false;
    @Input() intermediario: string = '';
    @Input() intermediariolink: string = '';

}