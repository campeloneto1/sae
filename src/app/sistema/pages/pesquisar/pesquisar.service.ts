import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})
export class PesquisarService{
    constructor(private http: HttpClient){}

    pesquisar(data: any) {
        return this.http.post(`${API}/pesquisar`, data);
    }
}