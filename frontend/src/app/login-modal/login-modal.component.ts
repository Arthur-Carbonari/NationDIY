import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {

    this.loginForm = this.formBuilder.group({

      emailOrUsername: [null, [Validators.required]],

      password: [null, [Validators.required]],
    })

  }

  onSubmit() {

    if (this.loginForm.invalid) { return };

    const { emailOrUsername, password } = this.loginForm.value;

    this.authService.login(emailOrUsername, password)
      .subscribe({
        next: (_response) => { this.router.navigateByUrl(this.router.url); },
        error: (error) => { console.log(error); }
      });

  }

}
