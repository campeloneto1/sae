import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Usuario } from "../../pages/usuarios/usuarios";
import { UsuariosService } from "../../pages/usuarios/usuarios.service";
import { SessionService } from "../../shared/session.service";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../../shared/shared.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule]
})

export class NavbarComponent{

    user!: Usuario;

    protected form!: FormGroup;

    constructor(private sessionService: SessionService,
        private sharedService: SharedService,
        private usuariosService: UsuariosService,
        private formBuilder: FormBuilder){

    }

    ngOnInit(): void {
        this.user = this.sessionService.retornaUser();

        this.form = this.formBuilder.group({
            id: [''],
            senha: [
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
              ]),
            ],
            confirmsenha: [
                '',
                Validators.compose([
                  Validators.required,
                  Validators.minLength(6),
                  Validators.maxLength(20),
                ]),
              ],
          });
    }

    logout(){
        this.sessionService.logout();
    }

    alterarSenha(){
        /*this.usuariosService.changpass(this.form.value).subscribe({
            next: (data:any) => {
                this.sharedService.toast('Sucesso!', data as string, 3);
                this.form.reset();
            },
            error: (error:any)=> {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        })*/
    }
    
}