import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import validator from "validator"

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {

  signupForm: FormGroup
  errorMessages: {[key: string]: { [key: string]: string }}

  // Common used error messages defined here
  static readonly required = "This field is required."

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {

    this.signupForm = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email]],

      username: [null, [Validators.required, Validators.minLength(5)]],

      password: [null, [Validators.required, this.passwordStrengthValidator]],

      confirmPassword: [null, [Validators.required, this.confirmPasswordValidator]],

      termsAndConditions: [null, [Validators.required]]
    })

    const requiredMessage = "This field is required."

    this.errorMessages = {
      email: { required: requiredMessage, email: 'This is not a valid email address.' },
      username: { required: requiredMessage, minlength: 'Username needs to be at least 5 characters long.' },
      password: { required: requiredMessage, weakPassword: 'Password should be at least 8 characters long, including uppercase letters, numbers, special characters.' },
      confirmPassword: { required: requiredMessage, passwordMismatch: 'Passwords do not match.' },
      termsAndConditions: { required: 'You need to accept the terms and conditions to create an account.' },
    }

  }

  onSubmit() {

    if (this.signupForm.invalid) { return };

    console.log(this.signupForm.value);

    const { email, username, password } = this.signupForm.value;

    this.authService.signup(email, username, password)
      .subscribe({
        next: (_response) => { this.router.navigateByUrl(this.router.url); },
        error: (error) => { console.log(error); }
      });

  }

  getErrorMessage(controlName: string) {

    const control = this.signupForm.controls[controlName]

    if (!control || !control.dirty || !control.errors) return null

    return this.errorMessages[controlName][Object.keys(control.errors)[0]]

  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password || !validator.isStrongPassword(password)) {
      return { weakPassword: true };  
    }

    return null;
  }

  private confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword ? null : { passwordMismatch: true };
  }

}


