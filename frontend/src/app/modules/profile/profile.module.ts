import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,

    SharedModule
  ],
})
export class ProfileModule { }
