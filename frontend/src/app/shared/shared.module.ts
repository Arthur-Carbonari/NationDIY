import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { PostQuestionDialogComponent } from './components/post-question-dialog/post-question-dialog.component';

@NgModule({
  declarations: [
    TextEditorComponent,
    SignupDialogComponent,
    LoginDialogComponent,
    PostQuestionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular material imports
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
    // Rich Text-Editor
    NgxEditorModule,
  ],
  exports: [
    TextEditorComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SharedModule { }
