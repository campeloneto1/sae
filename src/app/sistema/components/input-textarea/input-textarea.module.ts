import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaComponent } from './input-textarea.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [InputTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  exports: [InputTextareaComponent],
})
export class InputTextareaModule {}
