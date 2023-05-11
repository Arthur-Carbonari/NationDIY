import { Component, OnInit, HostListener } from '@angular/core';
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
  
  // used to change the navbar class if it is scrolled 
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY >= 56) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}