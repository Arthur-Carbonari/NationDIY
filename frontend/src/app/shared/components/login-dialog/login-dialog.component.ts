import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SmartForm } from '../../classes/smart-form.abstract';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent extends SmartForm {

  loginForm: FormGroup;

  loginError = '';

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private dialogRef: MatDialogRef<LoginDialogComponent>, public dialogService: DialogService ) {

    const loginForm = formBuilder.group({

      emailOrUsername: [null, [Validators.required]],

      password: [null, [Validators.required]],
    })

    super(loginForm)

    this.loginForm = loginForm

  }

  onSubmit() {

    if(this.loginError) this.loginError = ''

    if (this.loginForm.invalid) { return };

    const { emailOrUsername, password } = this.loginForm.value;

    this.authService.login(emailOrUsername, password)
      .subscribe({
        next: (_response) => { this.dialogRef.close() },
        error: (error: HttpErrorResponse) => {
          this.loginError = error.status === 401 ? 'Invalid email or password. Please try again.' : 'Error loging in, please refresh the page and try again.'
          this.loginForm.get('password')?.reset();
        }
      });

  }

}
