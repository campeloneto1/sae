import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class InicioService{

    constructor(private http: HttpClient){}

    quant_analises(){
        return this.http.get(`${API}/inicio-quantanalises`);
    }
}