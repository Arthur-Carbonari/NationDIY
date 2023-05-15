import { Component, Input, OnInit } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProfileService } from '../../services/profile.service';

export interface tabs{
  label: string;
  content: any;
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() userId!: string

  profileData: any

  constructor(private profileService: ProfileService, private router: Router, public authService: AuthenticationService){}

  ngOnInit(): void {

    if(!this.userId){
      this.router.navigateByUrl('')
      return
    }
    
    this.profileService.getProfile(this.userId).subscribe( profileData => {

      if(!profileData) this.router.navigateByUrl('/404')

      this.profileData = profileData

      console.log(profileData);
      
    })

  }

}
