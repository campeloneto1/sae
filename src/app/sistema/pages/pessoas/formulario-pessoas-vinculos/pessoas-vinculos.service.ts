import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { PessoaVinculo, PessoasVinculos } from "./pessoas-vinculos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PessoasVinculosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<PessoasVinculos> {
      return this.http.get<PessoasVinculos>(`${API}/pessoas-vinculos`);
    }

    show(id: number): Observable<PessoaVinculo> {
      return this.http.get<PessoaVinculo>(`${API}/pessoas-vinculos/${id}`);
    }    
  
    store(data: PessoaVinculo){
      return this.http.post(`${API}/pessoas-vinculos`,data);
    }
  
    update(data: PessoaVinculo){
      return this.http.put(`${API}/pessoas-vinculos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/pessoas-vinculos/${id}`);
    }    
}