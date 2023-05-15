// import componenets to be routed 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { FoundErrorComponent } from './layout/found-error/found-error.component';
import { ServerErrorComponent } from './layout/server-error/server-error.component';



//  path is the "url", used with <a routerLink= 
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'questions', loadChildren: () => import("./modules/questions/questions.module").then(m => m.QuestionsModule)},
  {path: '500', component: ServerErrorComponent},
  {path: 'profile', loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule)},

  // Redirect all unmatched path to 404 
  {path: '**', pathMatch: 'full', component: FoundErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
