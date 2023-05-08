import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SignupModalComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  
  ],
  exports: [
    SignupModalComponent,
    LoginModalComponent
  ]
})
export class ModalFormsModule { }
