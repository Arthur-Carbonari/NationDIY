import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import validator from "validator"
import { SmartForm } from '../../classes/smart-form.abstract';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent extends SmartForm {

  signupForm: FormGroup

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private dialogRef: MatDialogRef<SignupDialogComponent>, public dialogService: DialogService) {

    const signupForm = formBuilder.group({

      email: [null, [Validators.required, Validators.email]],

      username: [null, [Validators.required, Validators.minLength(5)]],

      password: [null, [Validators.required, passwordStrengthValidator]],

      confirmPassword: [null, [Validators.required, confirmPasswordValidator]],

      termsAndConditions: [null, [Validators.required]]
    })

    const formErrorMessages = {
      email: { email: 'This is not a valid email address.' },
      username: { minlength: 'Username needs to be at least 5 characters long.' },
      password: { weakPassword: 'Password should be at least 8 characters long, including uppercase letters, numbers, special characters.' },
      confirmPassword: { passwordMismatch: 'Passwords do not match.' },
      termsAndConditions: { required: 'You need to accept the terms and conditions to create an account.' },
    }

    super(signupForm, formErrorMessages)

    this.signupForm = signupForm

  }

  onSubmit() {

    if (this.signupForm.invalid) { return };

    console.log(this.signupForm.value);

    const { email, username, password } = this.signupForm.value;

    this.authService.signup(email, username, password)
      .subscribe({
        next: (_response) => { this.dialogRef.close() },
        error: (error) => { console.log(error); }
      });

  }

}

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  if (!password || !validator.isStrongPassword(password)) {
    return { weakPassword: true };
  }

  return null;
}

function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.root.get('password');
  const confirmPassword = control.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword ? null : { passwordMismatch: true };
}