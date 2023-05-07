import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title: string = 'NationDIY'
  constructor(public authService: AuthenticationService) { }

  logout(){
    this.authService.logout()
  }
}
