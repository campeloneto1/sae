import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from "src/environments/environments";

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

  @Input() id!: string;
  @Input() label!: string;
  @Input() tipo!: string;

  protected editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Insira o texto aqui...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
     
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'table 1x2',
        class: '<!--',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
      },
      {
        name: 'table 2x2',
        class: '<!--',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
      },  
      {
        name: 'table 2x3',
        class: '<!--',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
      },       
      {
        name: 'table 3x3',
        class: '<!--',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
      }
    ],
    uploadUrl: environment.url+'/upload-image',
    //upload: (file: File) => { console.log(file) },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['strikeThrough',
      'subscript',
      'superscript',],
    ]
};

  protected inputvalor!: any;
  protected control!: AbstractControl;

  protected touched = false;

  protected disabled = true;

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
      
  }

  onChange = (inputvalor: any) => {};

  onTouched = () => {};

  change() {
    console.log(this.inputvalor);
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

  teste(){

  }

}