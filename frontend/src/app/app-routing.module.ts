// import componenets to be routed 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { AskQuestionComponent } from './modules/questions/pages/ask-question/ask-question.component';
import { FoundErrorComponent } from './layout/found-error/found-error.component';
import { ServerErrorComponent } from './layout/server-error/server-error.component';
import { ProfileComponent  } from './modules/profile/profile.component';



//  path is the "url", used with <a routerLink= 
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'ask-question', component: AskQuestionComponent},
  {path: 'questions', loadChildren: () => import("./modules/questions/questions.module").then(m => m.QuestionsModule)},
  {path: '500', component: ServerErrorComponent},
  {path: 'profile', component: ProfileComponent},

  // Redirect all unmatched path to 404 
  {path: '**', pathMatch: 'full', component: FoundErrorComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
