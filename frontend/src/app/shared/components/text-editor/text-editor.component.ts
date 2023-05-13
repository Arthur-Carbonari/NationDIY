import { Component, forwardRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor, toHTML, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true
    }
  ]
})
export class TextEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
  ];

  onChange = (value: string) => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.editor = new Editor();

    this.editor.valueChanges.subscribe( content => {  
      
      const html = toHTML(content)
      
      this.onChange(html == "<p></p>" ? "" : html)
      this.onTouched()
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  writeValue(value: string): void {
    this.editor.setContent(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}