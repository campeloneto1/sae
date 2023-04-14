import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environments";
import { Perfil } from "../pages/perfis/perfis";
import { Usuario } from "../pages/usuarios/usuarios";
import { Session } from "./session";

const API = environment.url;

@Injectable({providedIn: 'root'})

export class SessionService{
    private token!: string;
    private user!: Usuario;

      pathadministrador = [
        'Analises/Categorias',
        'Batalhoes',
        'Cidades',
        'Cnh/Categorias',
        'Companhias',
        'Comportamentos',
        'Cores',
        'Escolaridades',
        'Estados',
        'Graduacoes',
        'Logs',
        'Marcas',
        'Modelos',
        'Paises',
        'Perfis',      
        'Sexos',
        'Arquivos/Tipos', 
        'Analises/Tipos', 
        'Envolvimentos/Tipos', 
        'Lotacoes/Tipos', 
        'Organizacoes/Tipos', 
        'Processos/Tipos', 
        'Situacoes/Tipos',
        'CgdsSituacoes/Tipos',
        'Veiculos/Tipos', 
        'Vinculos/Tipos', 
        
      ];
      
      pathgestor = [        
        'Influencias',
        'RedesSociais',
        'Usuarios',
      ];  
      
      pathanalises = [        
        'Analises',
        'Analises/:id',
        'Analises/:id/Imprimir',
      ]; 

      pathinvestigacoes = [        
        'InvestigacoesSociais',
        'InvestigacoesSociais/:id',
        'InvestigacoesSociais/:id/Imprimir',
      ]; 

      pathorganizacoes = [        
        'Organizacoes',
        'Organizacoes/:id',
        'Organizacoes/:id/Imprimir',
      ]; 

      pathpessoas = [        
        'Pessoas',
        'Pessoas/:id',
        'Pessoas/:id/Imprimir',
      ];
      
      pathveiculos = [        
        'Veiculos',
        'Veiculos/:id',
        'Veiculos/:id/Imprimir',
      ];

      constructor(private router: Router,
        private http: HttpClient){
        try {
            if(localStorage.getItem('sistema') == 'sae'){
              //console.log(sessionStorage.getItem('usuario'));
              var temp = localStorage.getItem('token')?.length;
              var temp2 = localStorage.getItem('user')?.length;
              if (localStorage.getItem('user')) {
                //@ts-ignore
                this.setUser(JSON.parse(atob(localStorage.getItem('user')?.substr(0, temp2 - 7))));
              }

              if (localStorage.getItem('token')) {
                //@ts-ignore
                this.setToken(atob(localStorage.getItem('token')?.substr(0, temp - 7)));
              }
            }
           
          }
          catch (e) {
            localStorage.clear();
            this.router.navigate(['/auth'])
          }
    }

    makeid(length:any) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    setSession(data: Session){
        var string = this.makeid(7);
        var string2 = this.makeid(7); 

        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('sistema', 'sae');
        localStorage.setItem('token', btoa(data.token) + string);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)) + string2);
    }
    
    check(){
        if(localStorage.getItem('token') && localStorage.getItem('sistema') == 'sae'){
           return true;   
        }else{
            return false;
        }
    }

    setToken(data: string){
      this.token = data;
    }

    setUser(data: Usuario){
        this.user = data;
    }

    retornaToken(){
        return this.token;
    }

    retornaUser():Usuario{
      return this.user;
    }

    retornaPerfil():Perfil{
      return this.user.perfil;
    }

    hasPermission(data: any):boolean{
      //console.log(data.routeConfig.path)
      if(this.pathadministrador.includes(data.routeConfig.path) && !this.user.perfil?.administrador){
        return false;
      }
      if(this.pathgestor.includes(data.routeConfig.path) && !this.user.perfil?.gestor){
        return false;
      }

      if(this.pathanalises.includes(data.routeConfig.path) && !this.user.perfil?.analises){
        return false;
      }

      if(this.pathinvestigacoes.includes(data.routeConfig.path) && !this.user.perfil?.investigacoes_sociais){
        return false;
      }

      if(this.pathorganizacoes.includes(data.routeConfig.path) && !this.user.perfil?.organizacoes){
        return false;
      }

      if(this.pathpessoas.includes(data.routeConfig.path) && !this.user.perfil?.pessoas){
        return false;
      }

      if(this.pathveiculos.includes(data.routeConfig.path) && !this.user.perfil?.veiculos){
        return false;
      }
      
      
      return true;
    }

    logout(){
      this.token = '';
      this.user = {} as Usuario;
      localStorage.clear();
      this.router.navigate(['/auth'])
    }
}