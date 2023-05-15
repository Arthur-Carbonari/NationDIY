import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent {
  constructor(public authService: AuthenticationService) { }
}
