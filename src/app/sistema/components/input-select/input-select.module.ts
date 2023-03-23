import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
//import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgxSelectModule } from 'ngx-select-ex';
import { InputSelectComponent } from "./input-select.component";

@NgModule({
    declarations: [InputSelectComponent],
    imports:[CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSelectModule
        //SelectDropDownModule,
        
    ],
    exports: [InputSelectComponent]
})

export class InputSelectModule{}