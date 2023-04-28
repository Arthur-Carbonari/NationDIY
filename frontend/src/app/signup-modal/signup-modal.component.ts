import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import validator from 'validator';


@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {

  signupForm: FormGroup

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {

    this.signupForm = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email]],

      username: [null, [Validators.required, Validators.minLength(5)]],

      password: [null, [Validators.required, this.passwordStrengthValidator]],

      confirmPassword: [null, [Validators.required]]
    })

  }

  passwordStrengthValidator(control: any) {
    const password = control.value;
    if (!password || !validator.isStrongPassword(password)) {
      return { 'passwordStrength': true };
    }
    return null;
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

}


