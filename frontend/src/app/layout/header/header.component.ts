import { DialogConfig } from '@angular/cdk/dialog';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignupDialogComponent } from 'src/app/shared/components/signup-dialog/signup-dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  title: string = 'NationDIY'
  constructor(public authService: AuthenticationService, public dialogService: DialogService) { }

  logout(){
    this.authService.logout()
  }
  
  // // used to change the navbar class if it is scrolled 
  // isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (window.scrollY >= 56) {
  //     this.isScrolled = true;
  //   } else {
  //     this.isScrolled = false;
  //   }
  // }
}