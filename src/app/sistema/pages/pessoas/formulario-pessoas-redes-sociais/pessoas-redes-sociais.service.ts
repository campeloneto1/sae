import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { PessoaRedeSocial, PessoasRedesSociais } from "./pessoas-redes-sociais";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PessoasRedesSociaisService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<PessoasRedesSociais> {
      return this.http.get<PessoasRedesSociais>(`${API}/pessoas-redes-sociais`);
    }

    show(id: number): Observable<PessoaRedeSocial> {
      return this.http.get<PessoaRedeSocial>(`${API}/pessoas-redes-sociais/${id}`);
    }    
  
    store(data: PessoaRedeSocial){
      return this.http.post(`${API}/pessoas-redes-sociais`,data);
    }
  
    update(data: PessoaRedeSocial){
      return this.http.put(`${API}/pessoas-redes-sociais/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/pessoas-redes-sociais/${id}`);
    }
}