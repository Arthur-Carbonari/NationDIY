import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsModule } from '../questions/questions.module';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    ProfileCardComponent,
    MyProfileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,

    SharedModule,
    QuestionsModule
  ],
})
export class ProfileModule { }
