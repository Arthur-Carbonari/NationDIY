import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent{

  userId: string

  constructor(public route: ActivatedRoute){
    this.userId = route.snapshot.paramMap.get('id') || ""
  }


}
