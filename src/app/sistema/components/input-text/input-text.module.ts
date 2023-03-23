import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputTextComponent } from './input-text.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [InputTextComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxEditorModule
  ],
  providers: [provideNgxMask()],
  exports: [InputTextComponent],
})
export class InputTextModule {}
