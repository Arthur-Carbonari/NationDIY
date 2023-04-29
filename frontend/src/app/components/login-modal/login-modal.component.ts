import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmartForm } from 'src/app/shared/classes/smart-form.abstract';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent extends SmartForm {

  loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {

    const loginForm = formBuilder.group({

      emailOrUsername: [null, [Validators.required]],

      password: [null, [Validators.required]],
    })

    super(loginForm)

    this.loginForm = loginForm

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
