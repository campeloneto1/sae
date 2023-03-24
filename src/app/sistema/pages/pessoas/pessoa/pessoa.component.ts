import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { TituloComponent } from "src/app/sistema/components/titulo/titulo.component";
import { SharedModule } from "src/app/sistema/shared/shared.module";
import { SharedService } from "src/app/sistema/shared/shared.service";
import { FormularioPessoasVeiculosComponent } from "../formulario-pessoas-veiculos/formulario-pessoas-veiculos.component";
import { Pessoa } from "../pessoas";
import { PessoasVeiculosService } from "../pessoas-veiculos.service";
import { PessoasService } from "../pessoas.service";

@Component({
    selector: 'pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloComponent, FormularioPessoasVeiculosComponent]
})

export class PessoaComponent implements OnInit, OnDestroy{
    protected id!: number;
    protected pessoa$!: Observable<Pessoa>;

    protected subscription: any;

    @ViewChild('fecharmodalveiculo') closebutton:any;

    constructor(private activatedRoute: ActivatedRoute,
        private sharedService: SharedService,
        private pessoasService: PessoasService,
        private pessoasVeiculosService: PessoasVeiculosService){

    }
    
    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.pessoa$ = this.pessoasService.show(this.id);
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    refresh(){
        this.closebutton.nativeElement.click();
        this.pessoa$ = this.pessoasService.show(this.id);
    }

    deleteVeiculo(data: number){
        this.subscription = this.pessoasVeiculosService.destroy(data).subscribe({
            next: (data) => {
                this.sharedService.toast("Sucesso", data as string, 3);
                this.refresh();
            },
            error: (error) => {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        });
    }
}