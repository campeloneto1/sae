import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DataTablesModule } from "angular-datatables";
import { InputSelectModule } from "../components/input-select/input-select.module";
import { InputTextModule } from "../components/input-text/input-text.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { InputTextareaModule } from "../components/input-textarea/input-textarea.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,  
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        DataTablesModule,
        InputSelectModule,
        InputTextModule,
        InputTextareaModule,
        NgxEditorModule
    ],
    providers: [provideNgxMask()],
    exports: [ 
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        DataTablesModule,
        InputSelectModule,
        InputTextModule,
        InputTextareaModule,
        NgxEditorModule
    ]
})

export class SharedModule{
    
}