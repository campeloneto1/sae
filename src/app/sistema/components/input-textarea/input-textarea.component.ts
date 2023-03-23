import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { Editor, Toolbar } from 'ngx-editor';

@Component({
    selector: 'app-input-textarea',
    templateUrl: './input-textarea.component.html',
    styleUrls: ['./input-textarea.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => InputTextareaComponent)
    },
    {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: InputTextareaComponent
      },
    ]   
})

export class InputTextareaComponent implements ControlValueAccessor, OnInit, OnDestroy{

  protected editor!: Editor;
  protected html = '';
  protected toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  @Input() id!: string;
  @Input() label!: string;
  @Input() tipo!: string;
  @Input() mascara!: string;

  protected inputvalor!: any;
  protected control!: AbstractControl;

  ngOnDestroy(): void {
    if(this.tipo = 'textarea'){
       this.editor.destroy();
    }
  }

  ngOnInit(): void {
    if(this.tipo = 'textarea'){
      this.editor = new Editor();
    }    
  }

  onChange = (inputvalor:any) => {};

  onTouched = () => {};

  touched = false;

  disabled = true;

  change() {
    this.markAsTouched();
    if (!this.disabled) {     
      //console.log(this.inputvalor)
      this.onChange(this.inputvalor);
    }
  }

  writeValue(inputvalor: any) {
    this.inputvalor = inputvalor;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | void  {
    this.control = control;
    //console.log(control)
  }

}