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
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '../core/core.module';
import { ToDatePipe } from './pipes/to-date.pipe';
import { IsOwnerDirective } from './directives/is-owner.directive';

//exports and declares several reusable components, pipes, and directives that are used across multiple feature modules in the application.

@NgModule({
  declarations: [
    TextEditorComponent,
    SignupDialogComponent,
    LoginDialogComponent,
    PostQuestionDialogComponent,
    TagsInputComponent,
    ToDatePipe,
    IsOwnerDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    // Angular material imports
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    
    // Rich Text-Editor
    NgxEditorModule,
  ],
  exports: [
    TextEditorComponent,
    ToDatePipe,
    IsOwnerDirective
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SharedModule { }
