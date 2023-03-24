import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaComponent } from './input-textarea.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [InputTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  exports: [InputTextareaComponent],
})
export class InputTextareaModule {}
