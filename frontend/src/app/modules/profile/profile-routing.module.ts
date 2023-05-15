import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path: "", component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: ":id", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
